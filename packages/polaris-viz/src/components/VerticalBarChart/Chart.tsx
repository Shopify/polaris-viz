import type {ReactNode} from 'react';
import {useState, useMemo} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  estimateStringWidth,
  COLOR_VISION_SINGLE_ITEM,
  useChartContext,
  useChartPositions,
  LINE_HEIGHT,
  SMALL_CHART_HEIGHT,
  isInfinity,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import {stackOffsetDiverging, stackOrderNone} from 'd3-shape';

import {useIndexForLabels} from '../../hooks/useIndexForLabels';
import {ChartElements} from '../ChartElements';
import {
  YAxisAnnotations,
  Annotations,
  checkAvailableAnnotations,
} from '../Annotations';
import type {
  AnnotationLookupTable,
  RenderAnnotationContentData,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {XAxis} from '../XAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {GradientDefs} from '../shared';
import {ANNOTATIONS_LABELS_OFFSET, ChartMargin} from '../../constants';
import {TooltipWrapper} from '../TooltipWrapper';
import {getStackedValues, getStackedMinMax} from '../../utilities';
import {YAxis} from '../YAxis';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {
  useBarChartTooltipContent,
  useColorVisionEvents,
  useTheme,
  useReducedLabelIndexes,
} from '../../hooks';

import {VerticalBarGroup} from './components';
import {useVerticalBarChart} from './hooks/useVerticalBarChart';

export interface Props {
  data: DataSeries[];
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  seriesNameFormatter: LabelFormatter;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  renderHiddenLegendLabel?: (count: number) => string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  emptyStateText,
  renderAnnotationContent,
  renderLegendContent,
  renderTooltipContent,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
  renderHiddenLegendLabel,
  seriesNameFormatter,
}: Props) {
  const selectedTheme = useTheme();
  const {characterWidths, containerBounds} = useChartContext();

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const id = useMemo(() => uniqueId('VerticalBarChart'), []);

  useColorVisionEvents({
    enabled: data.length > 1,
  });

  const isSmallChart = containerBounds.height < SMALL_CHART_HEIGHT;

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Bar',
        series: data,
      },
    ],
    showLegend: showLegend && !isSmallChart,
    seriesNameFormatter,
  });

  const hideXAxis =
    isSmallChart || xAxisOptions.hide || selectedTheme.xAxis.hide;

  const [xAxisHeight, setXAxisHeight] = useState(hideXAxis ? 0 : LINE_HEIGHT);

  const [annotationsHeight, setAnnotationsHeight] = useState(0);
  const emptyState = data.length === 0;

  const indexForLabels = useIndexForLabels(data);

  const {formattedLabels, unformattedLabels} = useFormattedLabels({
    data: [data[indexForLabels]],
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const isStacked = type === 'stacked';
  const stackedValues = isStacked
    ? getStackedValues({
        series: data,
        labels: formattedLabels,
        order: stackOrderNone,
        offset: stackOffsetDiverging,
      })
    : null;

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: data[0] ? data[0].data.length : 0,
  });

  const {min, max} = getStackedMinMax({
    stackedValues,
    data,
    integersOnly: yAxisOptions.integersOnly,
  });

  let yScaleMax;

  if (yAxisOptions.maxYOverride === null) {
    yScaleMax = max;
  } else {
    const allValuesAreZero = data.every((series) =>
      series.data.every((point) => point.value === 0),
    );

    yScaleMax = allValuesAreZero ? 0 : max;
  }

  if (isInfinity(yScaleMax) || isInfinity(min)) {
    throw new Error('min and max must be finite numbers.');
  }

  const yScaleOptions = {
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    maxYOverride: yAxisOptions.maxYOverride,
    max: yScaleMax,
    min,
  };

  const {ticks: initialTicks} = useYScale({
    ...yScaleOptions,
    drawableHeight: height,
    verticalOverflow: selectedTheme.grid.verticalOverflow,
  });

  const yAxisLabelWidth = useMemo(() => {
    const longest = Math.max(
      ...initialTicks.map(({formattedValue}) =>
        estimateStringWidth(formattedValue, characterWidths),
      ),
    );

    return longest;
  }, [characterWidths, initialTicks]);

  const {
    drawableWidth,
    drawableHeight,
    chartXPosition,
    chartYPosition,
    xAxisBounds,
    yAxisBounds,
  } = useChartPositions({
    annotationsHeight,
    height,
    width,
    xAxisHeight,
    yAxisWidth: yAxisLabelWidth,
  });

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: chartYPosition,
  };

  const {sortedData, areAllNegative, xScale, gapWidth} = useVerticalBarChart({
    data,
    drawableWidth,
    labels: formattedLabels,
  });

  const {ticks, yScale} = useYScale({
    ...yScaleOptions,
    drawableHeight,
    verticalOverflow: selectedTheme.grid.verticalOverflow,
  });

  const barColors = data.map(({color}) => color!);

  const getTooltipMarkup = useBarChartTooltipContent({
    renderTooltipContent,
    data,
    seriesColors: barColors,
    seriesNameFormatter,
  });

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  const xAxisLabelHalf = xScale.bandwidth() / 2;

  return (
    <ChartElements.Div height={height} width={width}>
      <ChartElements.Svg
        height={height}
        width={width}
        emptyStateText={emptyStateText}
        emptyState={emptyState}
        setRef={setSvgRef}
      >
        {hideXAxis ? null : (
          <XAxis
            allowLineWrap={xAxisOptions.allowLineWrap}
            labels={formattedLabels}
            labelWidth={xScale.bandwidth()}
            onHeightChange={setXAxisHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            x={xAxisBounds.x}
            xScale={xScale}
            y={xAxisBounds.y}
          />
        )}

        <GradientDefs
          direction="vertical"
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
          id={id}
          seriesColors={barColors}
          size={isStacked ? '100%' : `${width}px`}
        />

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: chartYPosition,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        <YAxis
          ticks={ticks}
          textAlign="right"
          width={yAxisLabelWidth}
          x={yAxisBounds.x}
          y={yAxisBounds.y}
        />

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          <VerticalBarGroup
            colors={barColors}
            data={data}
            drawableHeight={drawableHeight}
            gapWidth={gapWidth}
            id={id}
            labels={formattedLabels}
            sortedData={sortedData}
            stackedValues={stackedValues}
            xScale={xScale}
            yAxisOptions={yAxisOptions}
            yScale={yScale}
            areAllNegative={areAllNegative}
          />
        </g>

        {hasXAxisAnnotations && (
          <g
            transform={`translate(${chartXPosition + xAxisLabelHalf},0)`}
            tabIndex={-1}
          >
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              axisLabelWidth={xScale.bandwidth()}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={unformattedLabels}
              labelFormatter={xAxisOptions.labelFormatter}
              onHeightChange={setAnnotationsHeight}
              xScale={xScale}
              renderAnnotationContent={renderAnnotationContent}
            />
          </g>
        )}

        {hasYAxisAnnotations && (
          <g
            transform={`translate(${chartXPosition},${chartYPosition})`}
            tabIndex={-1}
          >
            <YAxisAnnotations
              annotationsLookupTable={annotationsLookupTable}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              ticks={ticks}
              yScale={yScale}
            />
          </g>
        )}
      </ChartElements.Svg>

      {sortedData.length > 0 && (
        <TooltipWrapper
          bandwidth={xScale.bandwidth()}
          chartBounds={chartBounds}
          chartType={InternalChartType.Bar}
          data={data}
          focusElementDataType={DataType.BarGroup}
          getMarkup={getTooltipMarkup}
          longestSeriesIndex={indexForLabels}
          margin={{...ChartMargin, Top: chartYPosition}}
          parentElement={svgRef}
          type={type}
          usePortal
          xScale={xScale}
          yScale={yScale}
        />
      )}

      {showLegend && !isSmallChart && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
          enableHideOverflow
          renderHiddenLegendLabel={renderHiddenLegendLabel}
        />
      )}
    </ChartElements.Div>
  );
}

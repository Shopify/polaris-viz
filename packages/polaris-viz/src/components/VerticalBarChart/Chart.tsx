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
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  BoundingRect,
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
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {getVerticalBarChartTooltipPosition} from '../../utilities/getVerticalBarChartTooltipPosition';
import {XAxis} from '../XAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {GradientDefs} from '../shared';
import {ANNOTATIONS_LABELS_OFFSET, ChartMargin} from '../../constants';
import type {TooltipPosition, TooltipPositionParams} from '../TooltipWrapper';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
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
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: BoundingRect;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
  renderLegendContent,
  renderTooltipContent,
  showLegend,
  type,
  xAxisOptions,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme();
  const {characterWidths} = useChartContext();

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const id = useMemo(() => uniqueId('VerticalBarChart'), []);
  const [xAxisHeight, setXAxisHeight] = useState(LINE_HEIGHT);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    data: [
      {
        shape: 'Bar',
        series: data,
      },
    ],
    dimensions,
    showLegend,
  });

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

  const yScaleOptions = {
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max,
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

  const hideXAxis = xAxisOptions.hide || selectedTheme.xAxis.hide;

  const {sortedData, areAllNegative, xScale, gapWidth, trendData} =
    useVerticalBarChart({
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
            trendData={trendData}
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
              onHeightChange={setAnnotationsHeight}
              xScale={xScale}
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
          focusElementDataType={DataType.BarGroup}
          getMarkup={getTooltipMarkup}
          getPosition={getTooltipPosition}
          margin={{...ChartMargin, Top: chartYPosition}}
          parentRef={svgRef}
          usePortal
        />
      )}

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          renderLegendContent={renderLegendContent}
        />
      )}
    </ChartElements.Div>
  );

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    if (index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const xPosition = xScale(`${index}`) ?? 0;
    const sortedDataPos = sortedData[index].map((num) =>
      Math.abs(num ?? 0),
    ) as number[];

    const highestValuePos =
      type === 'stacked'
        ? sortedData[index].reduce(sumPositiveData, 0)
        : Math.max(...sortedDataPos);

    const x = xPosition + chartXPosition;
    const y = yScale(highestValuePos!) + chartYPosition;

    return {
      x: x + (dimensions?.x ?? 0),
      y: Math.abs(y) + (dimensions?.y ?? 0),
      position: {
        horizontal: TooltipHorizontalOffset.Center,
        vertical: areAllNegative
          ? TooltipVerticalOffset.Below
          : TooltipVerticalOffset.Above,
      },
      activeIndex: index,
    };
  }

  function getTooltipPosition({
    event,
    index,
    eventType,
  }: TooltipPositionParams): TooltipPosition {
    return getVerticalBarChartTooltipPosition({
      tooltipPosition: {event, index, eventType},
      chartXPosition,
      formatPositionForTooltip,
      maxIndex: sortedData.length - 1,
      step: xScale.step(),
      yMin: ChartMargin.Top,
      yMax: drawableHeight + Number(ChartMargin.Bottom) + xAxisHeight,
    });
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}

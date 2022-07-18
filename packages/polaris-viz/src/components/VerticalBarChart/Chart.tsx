import React, {useState, useMemo} from 'react';
import {
  uniqueId,
  DataType,
  useYScale,
  estimateStringWidth,
  COLOR_VISION_SINGLE_ITEM,
  BoundingRect,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  ChartType,
  Dimensions,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {
  YAxisAnnotations,
  Annotations,
  checkAvailableAnnotations,
} from '../Annotations';
import type {
  RenderTooltipContentData,
  AnnotationLookupTable,
} from '../../types';
import {useFormattedLabels} from '../../hooks/useFormattedLabels';
import {getVerticalBarChartTooltipPosition} from '../../utilities/getVerticalBarChartTooltipPosition';
import {XAxis} from '../XAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {GradientDefs} from '../shared';
import {
  ANNOTATIONS_LABELS_OFFSET,
  BarChartMargin as Margin,
  LABEL_AREA_TOP_SPACING,
  XMLNS,
  Y_AXIS_CHART_SPACING,
} from '../../constants';
import {
  TooltipHorizontalOffset,
  TooltipVerticalOffset,
  TooltipPosition,
  TooltipPositionParams,
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
import styles from './Chart.scss';
import {useVerticalBarChart} from './hooks/useVerticalBarChart';

export interface Props {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  type: ChartType;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: Dimensions;
  emptyStateText?: string;
  theme: string;
}

export function Chart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
  renderTooltipContent,
  showLegend,
  theme,
  type,
  xAxisOptions,
  yAxisOptions,
}: Props) {
  useColorVisionEvents(data.length > 1);

  const selectedTheme = useTheme(theme);
  const {characterWidths} = useChartContext();

  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const id = useMemo(() => uniqueId('VerticalBarChart'), []);
  const [labelHeight, setLabelHeight] = useState(0);
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

  const labels = useFormattedLabels({
    data,
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const isStacked = type === 'stacked';
  const stackedValues = isStacked ? getStackedValues(data, labels) : null;

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: data[0] ? data[0].data.length : 0,
  });

  const chartYPosition = (Margin.Top as number) + annotationsHeight;
  const drawableHeight =
    height - chartYPosition - labelHeight - LABEL_AREA_TOP_SPACING;

  const {min, max} = getStackedMinMax({
    stackedValues,
    data,
    integersOnly: yAxisOptions.integersOnly,
  });

  const {ticks: initialTicks} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max,
    min,
  });

  const yAxisLabelWidth = useMemo(() => {
    const longest = Math.max(
      ...initialTicks.map(({formattedValue}) =>
        estimateStringWidth(formattedValue, characterWidths),
      ),
    );

    return longest;
  }, [characterWidths, initialTicks]);

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  const chartXPosition =
    yAxisLabelWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const drawableWidth = width - chartXPosition - horizontalMargin * 2;
  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: chartYPosition,
  };

  const hideXAxis = xAxisOptions.hide ?? selectedTheme.xAxis.hide;

  const {sortedData, areAllNegative, xScale, gapWidth} = useVerticalBarChart({
    data,
    drawableWidth,
    labels,
    theme,
  });

  const {ticks, yScale} = useYScale({
    drawableHeight,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
    max,
    min,
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

  return (
    <div className={styles.ChartContainer} style={{height, width}}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        width={width}
        height={height}
        className={styles.Svg}
        role={emptyState ? 'img' : 'list'}
        aria-label={emptyState ? emptyStateText : undefined}
        ref={setSvgRef}
      >
        {hideXAxis ? null : (
          <XAxis
            chartHeight={height}
            chartX={chartXPosition}
            chartY={drawableHeight + LABEL_AREA_TOP_SPACING + chartYPosition}
            labels={labels}
            labelWidth={xScale.bandwidth()}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

        <GradientDefs
          direction="vertical"
          gradientUnits={isStacked ? 'objectBoundingBox' : 'userSpaceOnUse'}
          id={id}
          seriesColors={barColors}
          size={isStacked ? '100%' : `${width}px`}
          theme={theme}
        />

        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={ticks}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: chartYPosition,
            }}
            width={width}
            theme={theme}
          />
        ) : null}

        <g transform={`translate(0,${chartYPosition})`} aria-hidden="true">
          <YAxis
            ticks={ticks}
            textAlign="right"
            width={yAxisLabelWidth}
            theme={theme}
          />
        </g>

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          <VerticalBarGroup
            colors={barColors}
            data={data}
            drawableHeight={drawableHeight}
            gapWidth={gapWidth}
            id={id}
            labels={labels}
            sortedData={sortedData}
            stackedValues={stackedValues}
            theme={theme}
            xScale={xScale}
            yAxisOptions={yAxisOptions}
            yScale={yScale}
            areAllNegative={areAllNegative}
          />
        </g>

        {hasXAxisAnnotations && (
          <g transform={`translate(${chartXPosition},0)`} tabIndex={-1}>
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              axisLabelWidth={xScale.bandwidth()}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={labels}
              onHeightChange={setAnnotationsHeight}
              theme={theme}
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
              theme={theme}
              ticks={ticks}
              yScale={yScale}
            />
          </g>
        )}
      </svg>

      <TooltipWrapper
        bandwidth={xScale.bandwidth()}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={{...Margin, Top: chartYPosition}}
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
          theme={theme}
        />
      )}
    </div>
  );

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    if (index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const xPosition = xScale(`${index}`) ?? 0;
    const sortedDataPos = sortedData[index].map((num) => Math.abs(num));

    const highestValuePos =
      type === 'stacked'
        ? sortedData[index].reduce(sumPositiveData, 0)
        : Math.max(...sortedDataPos);

    const x = xPosition + chartXPosition;
    const y = yScale(highestValuePos) + chartYPosition;

    return {
      x,
      y: Math.abs(y),
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
      yMin: Margin.Top,
      yMax: drawableHeight + Number(Margin.Bottom) + labelHeight,
    });
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}

import React, {useState} from 'react';
import {
  ChartMargin,
  BoundingRect,
  DataType,
  COLOR_VISION_SINGLE_ITEM,
  useTheme,
  XAxisOptions,
  useChartPositions,
  LINE_HEIGHT,
} from '@shopify/polaris-viz-core';
import type {Dimensions, DataGroup} from '@shopify/polaris-viz-core';

import {
  Annotations,
  checkAvailableAnnotations,
  YAxisAnnotations,
} from '../Annotations';
import {sortBarChartData} from '../../utilities/sortBarChartData';
import {getVerticalBarChartTooltipPosition} from '../../utilities/getVerticalBarChartTooltipPosition';
import {
  TooltipHorizontalOffset,
  TooltipPosition,
  TooltipPositionParams,
  TooltipVerticalOffset,
  TooltipWrapper,
  TOOLTIP_POSITION_DEFAULT_RETURN,
} from '../TooltipWrapper';
import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
} from '../../types';
import {XAxis} from '../XAxis';
import {useThemeSeriesColorsForDataGroup} from '../../hooks/useThemeSeriesColorsForDataGroup';
import {useColorVisionEvents, useReducedLabelIndexes} from '../../hooks';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {YAxis} from '../YAxis';
import {LegendContainer, useLegend} from '../LegendContainer';
import {ANNOTATIONS_LABELS_OFFSET, XMLNS} from '../../constants';

import {useDualAxisTicks} from './hooks/useDualAxisTicks';
import {useDualAxisTicksWidth} from './hooks/useDualAxisTickWidths';
import {useDualAxisScale} from './hooks/useDualAxisScale';
import {useXScale} from './hooks/useXScale';
import styles from './Chart.scss';
import {ComboBarChart, ComboLineChart, AxisLabel} from './components';
import {useSplitDataForCharts} from './hooks/useSplitDataForCharts';
import {useComboChartTooltipContent} from './hooks/useComboChartTooltipContent';
import {useComboChartPositions} from './hooks/useComboChartPositions';

export interface ChartProps {
  annotationsLookupTable: AnnotationLookupTable;
  data: DataGroup[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  annotationsLookupTable,
  data,
  dimensions,
  renderTooltipContent,
  showLegend,
  theme,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);

  useColorVisionEvents();

  const colors = useThemeSeriesColorsForDataGroup(data, selectedTheme);

  const [xAxisHeight, setXAxisHeight] = useState(LINE_HEIGHT);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [annotationsHeight, setAnnotationsHeight] = useState(0);

  const {legend, setLegendDimensions, height, width} = useLegend({
    colors,
    data,
    dimensions,
    showLegend,
  });

  const {drawableHeight, chartYPosition, xAxisBounds, yAxisBounds} =
    useChartPositions({
      annotationsHeight,
      height,
      width,
      xAxisHeight,
      yAxisWidth: 0,
    });

  const annotationsDrawableHeight =
    chartYPosition + drawableHeight + ANNOTATIONS_LABELS_OFFSET;

  const {
    doBothChartsContainMixedValues,
    doesOneChartContainAllNegativeValues,
    primaryTicks,
    primaryAxis,
    secondaryTicks,
    secondaryAxis,
    shouldPlaceZeroInMiddleOfChart,
    ticksBetweenZeroAndMax,
    yScale,
  } = useDualAxisTicks({
    data,
    drawableHeight,
  });

  const {leftTickWidth, rightTickWidth} = useDualAxisTicksWidth(
    primaryTicks,
    secondaryTicks,
  );

  const {barYScale, lineYScale, primaryYScale, secondaryYScale} =
    useDualAxisScale({
      doesOneChartContainAllNegativeValues,
      doBothChartsContainMixedValues,
      drawableHeight: annotationsDrawableHeight,
      primaryAxis,
      secondaryAxis,
      yScale,
      shouldPlaceZeroInMiddleOfChart,
      ticksBetweenZeroAndMax,
    });

  const {chartXPosition, drawableWidth, leftAxis, rightAxis} =
    useComboChartPositions({
      leftTickWidth,
      primaryAxis,
      rightTickWidth,
      secondaryAxis,
      width,
    });

  const {
    barChartData,
    barChartColors,
    lineChartColors,
    lineChartData,
    barChartIndexOffset,
    lineChartIndexOffset,
  } = useSplitDataForCharts(data, colors);

  const {xScale, labels} = useXScale({drawableWidth, data, xAxisOptions});

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: labels.length,
  });

  const hideXAxis = false;
  const labelWidth = drawableWidth / labels.length;

  const chartBounds: BoundingRect = {
    width,
    height,
    x: chartXPosition,
    y: chartYPosition,
  };

  const getTooltipMarkup = useComboChartTooltipContent({
    renderTooltipContent,
    data,
    seriesColors: colors,
  });

  const {hasXAxisAnnotations, hasYAxisAnnotations} = checkAvailableAnnotations(
    annotationsLookupTable,
  );

  return (
    <div
      className={styles.ChartContainer}
      style={{
        width,
        height,
      }}
    >
      <svg
        className={styles.SVG}
        role="list"
        viewBox={`0 0 ${width} ${height}`}
        xmlns={XMLNS}
        ref={setSvgRef}
        width={width}
        height={height}
      >
        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={primaryTicks}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: chartYPosition,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        {hideXAxis ? null : (
          <XAxis
            allowLineWrap={xAxisOptions.allowLineWrap}
            chartHeight={height}
            labels={labels}
            labelWidth={labelWidth}
            onHeightChange={setXAxisHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            x={chartXPosition}
            xScale={xScale}
            y={xAxisBounds.y}
          />
        )}

        {primaryAxis.name != null && (
          <AxisLabel
            axis="primary"
            height={drawableHeight}
            name={primaryAxis.name}
            x={leftAxis.labelX}
            y={yAxisBounds.y}
          />
        )}

        <YAxis
          ticks={primaryTicks}
          textAlign="right"
          width={leftTickWidth}
          x={leftAxis.x}
          y={yAxisBounds.y}
        />

        <g transform={`translate(${chartXPosition},${chartYPosition})`}>
          <ComboBarChart
            indexOffset={barChartIndexOffset}
            colors={barChartColors}
            data={barChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            labels={labels}
            yScale={barYScale}
          />
        </g>

        <g
          transform={`translate(${
            chartXPosition + drawableWidth / labels.length / 2
          },${chartYPosition})`}
        >
          <ComboLineChart
            activeIndex={activeIndex}
            colors={lineChartColors}
            data={lineChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            indexOffset={lineChartIndexOffset}
            theme={theme}
            xScale={xScale}
            yScale={lineYScale}
          />
        </g>

        {hasXAxisAnnotations && (
          <g transform={`translate(${chartXPosition},0)`} tabIndex={-1}>
            <Annotations
              annotationsLookupTable={annotationsLookupTable}
              axisLabelWidth={labelWidth}
              drawableHeight={annotationsDrawableHeight}
              drawableWidth={drawableWidth}
              labels={labels}
              onHeightChange={setAnnotationsHeight}
              xScale={xScale}
            />
          </g>
        )}

        {hasYAxisAnnotations && (
          <React.Fragment>
            <g
              transform={`translate(${chartXPosition},${chartYPosition})`}
              tabIndex={-1}
            >
              <YAxisAnnotations
                axis="y1"
                annotationsLookupTable={annotationsLookupTable}
                drawableHeight={annotationsDrawableHeight}
                drawableWidth={drawableWidth}
                ticks={primaryTicks}
                yScale={primaryYScale}
              />
              <YAxisAnnotations
                axis="y2"
                annotationsLookupTable={annotationsLookupTable}
                drawableHeight={annotationsDrawableHeight}
                drawableWidth={drawableWidth}
                ticks={secondaryTicks}
                yScale={secondaryYScale}
              />
            </g>
          </React.Fragment>
        )}

        <YAxis
          ticks={secondaryTicks}
          textAlign="left"
          width={rightTickWidth}
          x={rightAxis.x}
          y={yAxisBounds.y}
        />

        {secondaryAxis.name != null && (
          <AxisLabel
            axis="secondary"
            height={drawableHeight}
            name={secondaryAxis.name}
            x={rightAxis.labelX}
            y={yAxisBounds.y}
          />
        )}
      </svg>

      <TooltipWrapper
        bandwidth={labelWidth}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={ChartMargin}
        onIndexChange={(index) => setActiveIndex(index)}
        parentRef={svgRef}
      />

      {showLegend && (
        <LegendContainer
          colorVisionType={COLOR_VISION_SINGLE_ITEM}
          data={legend}
          onDimensionChange={setLegendDimensions}
        />
      )}
    </div>
  );

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    if (index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const sortedData = sortBarChartData(labels, barChartData.series);

    const xPosition = xScale(index) ?? 0;
    const sortedDataPos = sortedData[index].map((num) => Math.abs(num ?? 0));

    const highestValuePos = Math.max(...sortedDataPos);

    const x = xPosition + chartXPosition;
    const y = yScale(highestValuePos) + (ChartMargin.Top as number);

    return {
      x,
      y: Math.abs(y),
      position: {
        horizontal: TooltipHorizontalOffset.Left,
        vertical: TooltipVerticalOffset.Above,
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
      maxIndex: labels.length - 1,
      step: labelWidth,
      yMin: ChartMargin.Top,
      yMax: drawableHeight + Number(ChartMargin.Bottom) + xAxisHeight,
    });
  }
}

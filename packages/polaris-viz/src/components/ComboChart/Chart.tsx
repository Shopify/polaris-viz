import React, {useState} from 'react';
import {
  BarChartMargin,
  BoundingRect,
  DataType,
  LABEL_AREA_TOP_SPACING,
  useTheme,
  XAxisOptions,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';
import type {Dimensions, DataGroup} from '@shopify/polaris-viz-core';

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
import type {RenderTooltipContentData} from '../../types';
import {XAxis} from '../XAxis';
import {useThemeSeriesColorsForDataGroup} from '../../hooks/useThemeSeriesColorsForDataGroup';
import {useReducedLabelIndexes} from '../../hooks';
import {HorizontalGridLines} from '../HorizontalGridLines';
import {YAxis} from '../YAxis';
import {useLegend} from '../LegendContainer';
import {XMLNS} from '../../constants';

import {useDualAxisTicks} from './hooks/useDualAxisTicks';
import {useDualAxisTicksWidth} from './hooks/useDualAxisTickWidths';
import {useDualAxisScale} from './hooks/useDualAxisScale';
import {useXScale} from './hooks/useXScale';
import styles from './Chart.scss';
import {ComboBarChart, ComboLineChart} from './components';
import {useSplitDataForCharts} from './hooks/useSplitDataForCharts';
import {useComboChartTooltipContent} from './hooks/useComboChartTooltipContent';

export interface ChartProps {
  data: DataGroup[];
  isAnimated: boolean;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  theme: string;
  xAxisOptions: Required<XAxisOptions>;
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  isAnimated,
  renderTooltipContent,
  showLegend,
  theme,
  xAxisOptions,
}: ChartProps) {
  const selectedTheme = useTheme(theme);

  const colors = useThemeSeriesColorsForDataGroup(data, selectedTheme);

  const [labelHeight, setLabelHeight] = useState(0);
  const [svgRef, setSvgRef] = useState<SVGSVGElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {height, width} = useLegend({
    data,
    dimensions,
    showLegend,
  });

  const drawableHeight =
    height - labelHeight - LABEL_AREA_TOP_SPACING - BarChartMargin.Top;

  const {
    doBothChartsContainMixedValues,
    doesOneChartContainAllNegativeValues,
    leftTicks,
    primaryAxis,
    rightTicks,
    secondaryAxis,
    shouldPlaceZeroInMiddleOfChart,
    yScale,
  } = useDualAxisTicks({
    data,
    drawableHeight,
  });

  const {leftTickWidth, rightTickWidth} = useDualAxisTicksWidth(
    leftTicks,
    rightTicks,
  );

  const {barYScale, lineYScale} = useDualAxisScale({
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    drawableHeight,
    primaryAxis,
    secondaryAxis,
    yScale,
    shouldPlaceZeroInMiddleOfChart,
  });

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  const chartXPosition =
    leftTickWidth + Y_AXIS_CHART_SPACING + horizontalMargin;
  const chartYPosition = 0;
  const labelsYPosition =
    chartYPosition + drawableHeight + LABEL_AREA_TOP_SPACING;

  const drawableWidth =
    width - chartXPosition - horizontalMargin * 2 - rightTickWidth;

  const {barChartData, barChartColors, lineChartColors, lineChartData} =
    useSplitDataForCharts(data, colors);

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
      >
        {selectedTheme.grid.showHorizontalLines ? (
          <HorizontalGridLines
            ticks={leftTicks}
            theme={theme}
            transform={{
              x: selectedTheme.grid.horizontalOverflow ? 0 : chartXPosition,
              y: 0,
            }}
            width={
              selectedTheme.grid.horizontalOverflow ? width : drawableWidth
            }
          />
        ) : null}

        {hideXAxis ? null : (
          <XAxis
            chartHeight={height}
            chartX={chartXPosition}
            chartY={labelsYPosition}
            labels={labels}
            labelWidth={labelWidth}
            onHeightChange={setLabelHeight}
            reducedLabelIndexes={reducedLabelIndexes}
            theme={theme}
            xScale={xScale}
          />
        )}

        <g transform={`translate(${horizontalMargin},0)`} aria-hidden="true">
          <YAxis
            ticks={leftTicks}
            textAlign="right"
            width={leftTickWidth}
            theme={theme}
          />
        </g>

        <g
          transform={`translate(${
            chartXPosition + drawableWidth + Y_AXIS_CHART_SPACING
          },0)`}
          aria-hidden="true"
        >
          <YAxis
            ticks={rightTicks}
            textAlign="left"
            width={rightTickWidth}
            theme={theme}
          />
        </g>

        <g transform={`translate(${chartXPosition},${0})`}>
          <ComboBarChart
            colors={barChartColors}
            data={barChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            isAnimated={isAnimated}
            labels={labels}
            theme={theme}
            yScale={barYScale}
          />
        </g>

        <g
          transform={`translate(${
            chartXPosition + drawableWidth / labels.length / 2
          },${0})`}
        >
          <ComboLineChart
            activeIndex={activeIndex}
            colors={lineChartColors}
            data={lineChartData}
            drawableHeight={drawableHeight}
            drawableWidth={drawableWidth}
            isAnimated={isAnimated}
            theme={theme}
            xScale={xScale}
            yScale={lineYScale}
          />
        </g>
      </svg>

      <TooltipWrapper
        bandwidth={labelWidth}
        chartBounds={chartBounds}
        focusElementDataType={DataType.BarGroup}
        getMarkup={getTooltipMarkup}
        getPosition={getTooltipPosition}
        margin={BarChartMargin}
        onIndexChange={(index) => setActiveIndex(index)}
        parentRef={svgRef}
      />
    </div>
  );

  function formatPositionForTooltip(index: number | null): TooltipPosition {
    if (index == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const sortedData = sortBarChartData(labels, barChartData.series);

    const xPosition = xScale(index) ?? 0;
    const sortedDataPos = sortedData[index].map((num) => Math.abs(num));

    const highestValuePos = Math.max(...sortedDataPos);

    const x = xPosition + chartXPosition;
    const y = yScale(highestValuePos) + (BarChartMargin.Top as number);

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
      yMin: BarChartMargin.Top,
      yMax: drawableHeight + Number(BarChartMargin.Bottom) + labelHeight,
    });
  }
}

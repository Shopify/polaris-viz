import React, {useState, useMemo, useCallback} from 'react';

import {TooltipContainer} from '../TooltipContainer';
import {eventPoint, getTextWidth, getBarXAxisDetails} from '../../utilities';
import {YAxis} from '../YAxis';
import {BarChartXAxis} from '../BarChartXAxis';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {getStackedValues, formatAriaLabel} from './utilities';
import {Series, RenderTooltipContentData} from './types';
import {BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  FONT_SIZE,
  SMALL_WIDTH,
  SMALL_FONT_SIZE,
  SPACING,
  INNER_PADDING,
} from './constants';
import styles from './Chart.scss';

interface Props {
  series: Required<Series>[];
  labels: string[];
  chartDimensions: DOMRect;
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  timeSeries: boolean;
  isStacked: boolean;
  hasRoundedCorners: boolean;
  isAnimated: boolean;
}

export function Chart({
  series,
  chartDimensions,
  labels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  timeSeries,
  isStacked,
  hasRoundedCorners,
  isAnimated,
}: Props) {
  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const stackedValues = isStacked ? getStackedValues(series, labels) : null;

  const {ticks: initialTicks} = useYScale({
    drawableHeight: chartDimensions.height - MARGIN.Top - MARGIN.Bottom,
    data: series,
    formatYAxisLabel,
    stackedValues,
  });

  const yAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...initialTicks.map(({formattedValue}) =>
          getTextWidth({
            text: formattedValue,
            fontSize,
          }),
        ),
      ),
    [fontSize, initialTicks],
  );

  const axisMargin = SPACING + yAxisLabelWidth;

  const formattedXAxisLabels = useMemo(() => labels.map(formatXAxisLabel), [
    formatXAxisLabel,
    labels,
  ]);

  const xAxisDetails = useMemo(
    () =>
      getBarXAxisDetails({
        yAxisLabelWidth,
        xLabels: formattedXAxisLabels,
        fontSize,
        chartDimensions,
        padding: INNER_PADDING,
      }),
    [yAxisLabelWidth, formattedXAxisLabels, fontSize, chartDimensions],
  );

  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const sortedData = labels.map((_, index) => {
    return series.map((type) => type.data[index].rawValue);
  });

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data: sortedData,
    labels: formattedXAxisLabels,
  });

  const {maxXLabelHeight} = xAxisDetails;

  const drawableHeight =
    chartDimensions.height -
    MARGIN.Top -
    MARGIN.Bottom -
    xAxisDetails.maxXLabelHeight;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data: series,
    formatYAxisLabel,
    stackedValues,
  });

  const barColors = series.map(({color}) => color);
  const barHighlightColors = series.map(({highlightColor}) => highlightColor);

  const tooltipContentMarkup = useMemo(() => {
    if (activeBarGroup == null) {
      return null;
    }

    const data = series.map(({data, color, name}) => {
      return {
        label: name,
        color,
        value: data[activeBarGroup].rawValue,
      };
    });

    return renderTooltipContent({
      data,
      title: labels[activeBarGroup],
    });
  }, [activeBarGroup, labels, renderTooltipContent, series]);

  const accessibilityData = useMemo(
    () =>
      labels.map((title, index) => {
        const data = series.map(({data, name}) => {
          return {
            label: name,
            value: formatYAxisLabel(data[index].rawValue),
          };
        });
        return {title, data};
      }),
    [formatYAxisLabel, labels, series],
  );

  const handleFocus = useCallback(
    (index: number) => {
      const xScaleBandwidth = xScale.bandwidth();
      const xPosition = xScale(index.toString());

      if (index == null || xPosition == null) return;
      const highestValue = isStacked
        ? sortedData[index].reduce(sumPositiveData, 0)
        : Math.max(...sortedData[index]);
      setActiveBarGroup(index);

      const xOffsetAmount = xPosition + axisMargin + xScaleBandwidth / 2;
      setTooltipPosition({
        x: xOffsetAmount,
        y: yScale(highestValue),
      });
    },
    [axisMargin, isStacked, sortedData, xScale, yScale],
  );

  return (
    <div
      className={styles.ChartContainer}
      style={{
        height: chartDimensions.height,
        width: chartDimensions.width,
      }}
    >
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onMouseLeave={() => setActiveBarGroup(null)}
        onTouchEnd={() => setActiveBarGroup(null)}
        role="list"
      >
        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            maxXLabelHeight})`}
          aria-hidden="true"
        >
          <BarChartXAxis
            labels={xAxisLabels}
            xScale={xScale}
            xAxisDetails={xAxisDetails}
            showFewerLabels={timeSeries && xAxisDetails.needsDiagonalLabels}
            fontSize={fontSize}
          />
        </g>

        <g
          transform={`translate(${axisMargin},${MARGIN.Top})`}
          aria-hidden="true"
        >
          <YAxis
            ticks={ticks}
            drawableWidth={drawableWidth}
            fontSize={fontSize}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {stackedValues != null
            ? stackedValues.map((stackData, stackIndex) => {
                return (
                  <StackedBarGroup
                    key={stackIndex}
                    groupIndex={stackIndex}
                    activeBarGroup={activeBarGroup}
                    data={stackData}
                    xScale={xScale}
                    yScale={yScale}
                    colors={barColors}
                    highlightColors={barHighlightColors}
                    onFocus={handleFocus}
                    accessibilityData={accessibilityData}
                  />
                );
              })
            : sortedData.map((item, index) => {
                const xPosition = xScale(index.toString());
                const ariaLabel = formatAriaLabel(accessibilityData[index]);
                return (
                  <BarGroup
                    key={index}
                    x={xPosition == null ? 0 : xPosition}
                    isActive={activeBarGroup === index}
                    yScale={yScale}
                    data={item}
                    width={xScale.bandwidth()}
                    colors={barColors}
                    highlightColors={barHighlightColors}
                    onFocus={handleFocus}
                    barGroupIndex={index}
                    ariaLabel={ariaLabel}
                    hasRoundedCorners={hasRoundedCorners}
                    isAnimated={isAnimated}
                    drawableHeight={drawableHeight}
                  />
                );
              })}
        </g>
      </svg>

      {tooltipPosition != null && activeBarGroup != null ? (
        <TooltipContainer
          activePointIndex={activeBarGroup}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={chartDimensions}
          margin={MARGIN}
          position="center"
        >
          {tooltipContentMarkup}
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);

    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX - axisMargin;
    const currentIndex = Math.floor(currentPoint / xScale.step());

    if (
      currentIndex < 0 ||
      currentIndex > sortedData.length - 1 ||
      svgY <= MARGIN.Top ||
      svgY > drawableHeight + MARGIN.Bottom + maxXLabelHeight
    ) {
      setActiveBarGroup(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const highestValue = isStacked
      ? sortedData[currentIndex].reduce(sumPositiveData, 0)
      : Math.max(...sortedData[currentIndex]);
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + axisMargin + xScale.bandwidth() / 2;

    setActiveBarGroup(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(highestValue),
    });
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}

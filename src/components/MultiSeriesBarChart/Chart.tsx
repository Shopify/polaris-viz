import React, {useState, useMemo} from 'react';

import {TooltipContainer} from '../TooltipContainer';
import {eventPoint, getTextWidth} from '../../utilities';
import {YAxis} from '../YAxis';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {getStackedValues} from './utilities';
import {Series, RenderTooltipContentData} from './types';
import {XAxis, BarGroup, StackedBarGroup} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  LINE_HEIGHT,
  SPACING,
  FONT_SIZE,
  SMALL_WIDTH,
  SMALL_FONT_SIZE,
  DIAGONAL_ANGLE,
} from './constants';
import styles from './Chart.scss';

interface Props {
  series: Series[];
  labels: string[];
  chartDimensions: DOMRect;
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  timeSeries: boolean;
  isStacked: boolean;
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
}: Props) {
  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const yAxisLabelWidth = series
    .map(({data}) =>
      data.map(({rawValue}) =>
        getTextWidth({text: formatYAxisLabel(rawValue), fontSize: FONT_SIZE}),
      ),
    )
    .reduce((acc, currentValue) => acc.concat(currentValue), [])
    .reduce((acc, currentValue) => Math.max(acc, currentValue));

  const axisStartBuffer = SPACING;
  const axisMargin = axisStartBuffer + yAxisLabelWidth;

  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  /*
    take a series like:
    [
      [0, 7, 2],
      [1, 5, 4]
    ]
    labels: [Monday, Tuesday, Wednesday]

    and turn it into:
    [
      [0, 1] // Monday
      [7, 5] // Tuesday
      [4, 2] // Wednesday
    ]
  */
  const sortedData = labels.map((_, index) => {
    return series.map((type) => type.data[index].rawValue);
  });

  const formattedXAxisLabels = labels.map(formatXAxisLabel);
  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data: sortedData,
    labels: formattedXAxisLabels,
  });

  const fontSize = drawableWidth < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;
  const longestLabel = Math.max(
    ...xAxisLabels.map(({value}) => getTextWidth({text: value, fontSize})),
  );
  const overflowingLabel = longestLabel > xScale.bandwidth();

  const labelAngle = 90 + DIAGONAL_ANGLE;
  const radians = (labelAngle * Math.PI) / 180;
  const angledLabelHeight = Math.cos(radians) * longestLabel;

  const maxXLabelHeight = overflowingLabel ? angledLabelHeight : LINE_HEIGHT;

  const drawableHeight =
    chartDimensions.height - MARGIN.Top - MARGIN.Bottom - maxXLabelHeight;

  const stackedValues = isStacked ? getStackedValues(series, labels) : null;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data: series,
    formatYAxisLabel,
    stackedValues,
  });

  const barColors = series.map(({color}) => color);
  const barHighlightColors = series.map(({highlightColor}, index) =>
    highlightColor != null ? highlightColor : barColors[index],
  );

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
      >
        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            maxXLabelHeight})`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            needsDiagonalLabels={overflowingLabel}
            showFewerLabels={timeSeries && overflowingLabel}
            fontSize={fontSize}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
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
                  />
                );
              })
            : sortedData.map((item, index) => {
                const xPosition = xScale(index.toString());

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

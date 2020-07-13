import React, {useState} from 'react';
import {eventPoint, getTextWidth} from 'utilities';

import {YAxis} from '../YAxis';
import {TooltipContainer} from '../TooltipContainer';

import {Data} from './types';
import {XAxis, BarGroup, Tooltip} from './components';
import {useYScale, useXScale} from './hooks';
import {
  MARGIN,
  LINE_HEIGHT,
  SPACING,
  FONT_SIZE,
  SMALL_SCREEN,
  SMALL_FONT_SIZE,
} from './constants';
import styles from './Chart.scss';

interface Props {
  series: Data[];
  labels: string[];
  chartDimensions: DOMRect;
  formatYValue(value: number): string;
  timeSeries: boolean;
}

export function Chart({
  series,
  chartDimensions,
  formatYValue,
  labels,
  timeSeries,
}: Props) {
  const [activeBarGroup, setActiveBarGroup] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const yAxisLabelWidth = series
    .map(({data}) =>
      data.map((value) =>
        getTextWidth({text: formatYValue(value), fontSize: FONT_SIZE}),
      ),
    )
    .reduce((acc, currentValue) => acc.concat(currentValue), [])
    .reduce((acc, currentValue) => Math.max(acc, currentValue));

  const axisMargin = SPACING + yAxisLabelWidth;

  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const sortedData = labels.map((_, index) => {
    return series.map((type) => type.data[index]);
  });

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data: sortedData,
    labels,
  });

  const fontSize = drawableWidth < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;
  const longestLabel = Math.max(
    ...xAxisLabels.map(({value}) => getTextWidth({text: value, fontSize})),
  );
  const overflowingLabel = longestLabel > xScale.bandwidth();
  const needsDiagonalLabels = overflowingLabel && !timeSeries;

  const xAxisLabelSpace = needsDiagonalLabels ? longestLabel : LINE_HEIGHT;

  const drawableHeight =
    chartDimensions.height - MARGIN.Top - MARGIN.Bottom - xAxisLabelSpace;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data: series,
    formatYValue,
  });

  const barColors = series.map(({color}) => color);
  const barGroupLabels = series.map(({label}) => label);

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
            xAxisLabelSpace})`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            needsDiagonalLabels={needsDiagonalLabels}
            showAlternateLabels={timeSeries && overflowingLabel}
            fontSize={fontSize}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {sortedData.map((item, index) => {
            const xPosition = xScale(index.toString());

            return (
              <BarGroup
                key={index}
                x={xPosition == null ? 0 : xPosition}
                isActive={activeBarGroup === index}
                hasActiveGroup={activeBarGroup != null}
                yScale={yScale}
                data={item}
                width={xScale.bandwidth()}
                colors={barColors}
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
          <Tooltip
            colors={barColors}
            labels={barGroupLabels}
            values={sortedData[activeBarGroup]}
            formatValue={formatYValue}
          />
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
      svgY > drawableHeight + MARGIN.Bottom + xAxisLabelSpace
    ) {
      setActiveBarGroup(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const highestValue = Math.max(...sortedData[currentIndex]);
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + axisMargin + xScale.bandwidth() / 2;

    setActiveBarGroup(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(highestValue),
    });
  }
}

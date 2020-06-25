import React, {useState} from 'react';
import {Color} from 'types';
import {eventPoint, getTextWidth} from 'utilities';

import {BarData} from '../types';
import {XAxis, Bar} from '../components';
import {YAxis} from '../../YAxis';
import {TooltipContainer} from '../../TooltipContainer';
import {useYScale, useXScale} from '../hooks';
import {
  MARGIN,
  LINE_HEIGHT,
  SPACING,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  SMALL_SCREEN,
} from '../constants';

import styles from './Chart.scss';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  color: Color;
  highlightColor?: Color;
  formatYValue(value: number): string;
  formatXAxisLabel(value: string, index: number): string;
  histogram: boolean;
}

export function Chart({
  data,
  chartDimensions,
  color,
  highlightColor,
  formatYValue,
  formatXAxisLabel,
  histogram,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fontSize =
    chartDimensions.width < SMALL_SCREEN ? SMALL_FONT_SIZE : FONT_SIZE;

  const yAxisLabelWidth = data
    .map(({rawValue}) => getTextWidth({text: formatYValue(rawValue), fontSize}))
    .reduce((acc, currentValue) => Math.max(acc, currentValue));
  const axisMargin = SPACING + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    histogram,
    data,
    fontSize,
    formatXAxisLabel,
  });

  const xAxisLabelLines =
    xAxisLabels
      .map(({value}) => value.length)
      .reduce((acc, currentValue) => Math.max(acc, currentValue)) - 1;
  const xAxisLabelSpace = xAxisLabelLines * LINE_HEIGHT;
  const drawableHeight =
    chartDimensions.height - MARGIN.Top - MARGIN.Bottom - xAxisLabelSpace;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatYValue,
  });

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
        onMouseLeave={() => setActiveBar(null)}
        onTouchEnd={() => setActiveBar(null)}
      >
        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            xAxisLabelSpace})`}
        >
          <XAxis
            labels={xAxisLabels}
            range={xScale.range()}
            histogram={histogram}
          />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {data.map(({rawValue}, index) => {
            const xPosition = xScale(index.toString());

            return (
              <Bar
                key={index}
                x={xPosition == null ? 0 : xPosition}
                yScale={yScale}
                rawValue={rawValue}
                width={xScale.bandwidth()}
                isSelected={index === activeBar}
                color={color}
                highlightColor={highlightColor}
              />
            );
          })}
        </g>
      </svg>

      {tooltipPosition != null && activeBar != null ? (
        <TooltipContainer
          activePointIndex={activeBar}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={chartDimensions}
          margin={MARGIN}
          position="center"
        >
          <div className={styles.Tooltip}>
            {histogram == null ? (
              <strong>{data[activeBar].label}</strong>
            ) : null}
            {formatYValue(data[activeBar].rawValue)}
          </div>
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
      currentIndex > data.length - 1 ||
      svgY <= MARGIN.Top ||
      svgY > drawableHeight + MARGIN.Bottom + xAxisLabelSpace
    ) {
      setActiveBar(null);
      return;
    }

    const xPosition = xScale(currentIndex.toString());
    const value = data[currentIndex].rawValue;
    const tooltipXPositon =
      xPosition == null ? 0 : xPosition + axisMargin + xScale.bandwidth() / 2;

    setActiveBar(currentIndex);
    setTooltipPosition({
      x: tooltipXPositon,
      y: yScale(value),
    });
  }
}

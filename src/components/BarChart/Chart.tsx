import React, {useState} from 'react';
import {Color} from 'types';

import {
  MARGIN,
  LINE_HEIGHT,
  SPACING,
  SMALL_FONT_SIZE,
  FONT_SIZE,
  DIAGONAL_ANGLE,
  SMALL_WIDTH,
} from '../../constants';
import {eventPoint, getTextWidth} from '../../utilities';
import {YAxis} from '../YAxis';
import {TooltipContainer} from '../TooltipContainer';

import {BarData} from './types';
import {XAxis, Bar, Tooltip} from './components';
import {useYScale, useXScale} from './hooks';
import styles from './Chart.scss';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  barMargin: number;
  color: Color;
  highlightColor?: Color;
  formatYValue(value: number): string;
  formatXAxisLabel(value: string, index: number): string;
  timeSeries: boolean;
}

export function Chart({
  data,
  chartDimensions,
  barMargin,
  color,
  highlightColor,
  formatYValue,
  formatXAxisLabel,
  timeSeries,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const yAxisLabelWidth = data
    .map(({rawValue}) =>
      getTextWidth({text: formatYValue(rawValue), fontSize: FONT_SIZE}),
    )
    .reduce((acc, currentValue) => Math.max(acc, currentValue));

  const axisMargin = SPACING + yAxisLabelWidth;
  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const fontSize =
    chartDimensions.width < SMALL_WIDTH ? SMALL_FONT_SIZE : FONT_SIZE;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    data,
    barMargin,
    formatXAxisLabel,
  });

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
            maxXLabelHeight})`}
        >
          <XAxis
            labels={xAxisLabels}
            xScale={xScale}
            fontSize={fontSize}
            showFewerLabels={timeSeries && overflowingLabel}
            needsDiagonalLabels={overflowingLabel}
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
          <Tooltip
            label={data[activeBar].label}
            value={formatYValue(data[activeBar].rawValue)}
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
      currentIndex > data.length - 1 ||
      svgY <= MARGIN.Top ||
      svgY > drawableHeight + MARGIN.Bottom + maxXLabelHeight
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

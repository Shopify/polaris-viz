import React, {useState} from 'react';
import {Color} from 'types';
import {eventPoint, getTextWidth} from 'utilities';

import {BarData} from '../../types';
import {XAxis} from '../XAxis';
import {Bar} from '../Bar';
import {YAxis} from '../../../YAxis';
import {TooltipContainer} from '../../../TooltipContainer';
import {useYScale, useXScale} from '../../hooks';
import {MIN_BAR_HEIGHT, MARGIN, LINE_HEIGHT, SPACING} from '../../constants';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  histogram?: boolean;
  color: Color;
  highlightColor?: Color;
  formatValue(value: number): string;
}

export function Chart({
  data,
  chartDimensions,
  histogram,
  color,
  highlightColor,
  formatValue,
}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const axisMargin =
    SPACING +
    data
      .map(({rawValue}) => getTextWidth(formatValue(rawValue)))
      .reduce((acc, currentValue) => Math.max(acc, currentValue));

  const drawableWidth = chartDimensions.width - MARGIN.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    histogram,
    data,
  });

  const xAxisLabelHeight = xAxisLabels
    .map(({value}) => value.length)
    .reduce((acc, currentValue) => Math.max(acc, currentValue));

  const xAxisLabelSpace = (xAxisLabelHeight - 1) * LINE_HEIGHT;

  const drawableHeight =
    chartDimensions.height - MARGIN.Top - MARGIN.Bottom - xAxisLabelSpace;

  const {yScale, ticks} = useYScale({
    drawableHeight,
    data,
    formatValue,
  });

  return (
    <div
      style={{
        height: chartDimensions.height,
        width: chartDimensions.width,
        position: 'relative',
      }}
    >
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
      >
        <g
          transform={`translate(${axisMargin},${chartDimensions.height -
            MARGIN.Bottom -
            xAxisLabelSpace})`}
        >
          <XAxis labels={xAxisLabels} range={xScale.range()} />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <g transform={`translate(${axisMargin},${MARGIN.Top})`}>
          {data.map(({rawValue}, index) => {
            const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
            const needsMinHeight = rawHeight < MIN_BAR_HEIGHT;
            const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
            const modifiedYPosition =
              rawValue > 0 ? yScale(0) - MIN_BAR_HEIGHT : yScale(0);

            const yPosition = needsMinHeight
              ? modifiedYPosition
              : yScale(Math.max(0, rawValue));

            return (
              <Bar
                key={index}
                onMove={() => setActiveBar(index)}
                onEnd={() => setActiveBar(null)}
                x={xScale(index.toString())}
                y={yPosition}
                width={xScale.bandwidth()}
                height={height}
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
        >
          <strong>{data[activeBar].label}</strong>
          {formatValue(data[activeBar].rawValue)}
        </TooltipContainer>
      ) : null}
    </div>
  );

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    if (xScale == null) {
      return;
    }

    const point = eventPoint(event);
    if (point == null) {
      return;
    }

    const {svgX, svgY} = point;
    if (svgX < axisMargin) {
      return;
    }

    setTooltipPosition({
      x: svgX,
      y: svgY,
    });
  }
}

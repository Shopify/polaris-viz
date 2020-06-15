import React, {useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {BarData} from '../../types';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';
import {eventPoint} from 'utilities';
import {XAxis} from '../XAxis';
import {YAxis, TooltipContainer} from 'components';
//add index
import {useYScale} from '../../hooks/use-y-scale';
import {useXScale} from '../../hooks/use-x-scale';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  histogram?: boolean;
  color: Color;
  highlightColor?: Color;
  formatValue(value: number): string;
}

//seperate about and determine if these numbers are best
const Margin = {Top: 20, Right: 20, Bottom: 70, Left: 40};
const MIN_BAR_HEIGHT = 3;

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

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    if (axisMargin == null || xScale == null) {
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

  const height = chartDimensions.height - Margin.Top - Margin.Bottom;

  const {yScale, ticks, axisMargin} = useYScale({
    drawableHeight: height,
    data,
    formatValue,
  });

  const drawableWidth =
    axisMargin == null ? 0 : chartDimensions.width - Margin.Right - axisMargin;

  const {xScale, xAxisLabels} = useXScale({
    drawableWidth,
    histogram,
    data,
    dimensions: chartDimensions,
  });

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

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
            Margin.Bottom})`}
        >
          <XAxis labels={xAxisLabels} range={xScale.range()} />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {data.map(({rawValue}, index) => {
            const currentColor =
              activeBar === index && highlightColor != null
                ? tokens[highlightColor]
                : tokens[color];

            const animation = useSpring({
              config: {duration: 200},
              immediate: highlightColor == null || prefersReducedMotion,
              color: currentColor,
              from: {color: tokens[color]},
            });

            const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
            const needsMinHeight = rawHeight < MIN_BAR_HEIGHT;
            const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
            const modifiedYPosition =
              rawValue > 0 ? yScale(0) - MIN_BAR_HEIGHT : yScale(0);

            const yPosition = needsMinHeight
              ? modifiedYPosition
              : yScale(Math.max(0, rawValue));

            return (
              <animated.rect
                key={index}
                onMouseMove={() => {
                  setActiveBar(index);
                }}
                onTouchMove={() => {
                  setActiveBar(index);
                }}
                onTouchEnd={() => {
                  setActiveBar(null);
                }}
                onMouseLeave={() => {
                  setActiveBar(null);
                }}
                x={xScale(index.toString())}
                y={yPosition}
                fill={animation.color}
                width={xScale.bandwidth()}
                height={height}
              />
            );
          })}
        </g>
      </svg>

      {tooltipPosition != null && activeBar != null ? (
        <TooltipContainer
          activePointIndex={activeBar}
          currentX={tooltipPosition!.x}
          currentY={tooltipPosition!.y}
          chartDimensions={chartDimensions}
          margin={Margin}
        >
          <strong>{data[activeBar].label}</strong>
          {formatValue(data[activeBar].rawValue)}
        </TooltipContainer>
      ) : null}
    </div>
  );
}

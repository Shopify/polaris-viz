import React, {useState} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import {animated, useSpring} from 'react-spring';
import {BarData} from '../../types';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';
import {eventPoint} from 'utilities';
import {XAxis} from '../XAxis';
import {YAxis, TooltipContainer} from 'components';

interface Props {
  data: BarData[];
  chartDimensions: DOMRect;
  histogram?: boolean;
  color: Color;
  highlightColor?: Color;
  formatValue(value: number): string;
}

const FAKE_YAXIS_WIDTH = 40;

//seperate about and determine if these numbers are best
const Margin = {Top: 20, Right: 20, Bottom: 70, Left: 40};

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
    // 0 to be replaced with actual max width of labels // need to add the math
    const axisMargin = FAKE_YAXIS_WIDTH;

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

  const width = chartDimensions.width - Margin.Left - Margin.Right;
  const height = chartDimensions.height - Margin.Top - Margin.Bottom;

  const min = Math.min(...data.map(({rawValue}) => rawValue));
  const max = Math.max(...data.map(({rawValue}) => rawValue));

  const xScale = scaleBand()
    .rangeRound([0, width])
    .padding(histogram ? 0 : 0.1)
    .domain(data.map((_, index) => index.toString()));

  const yScale = scaleLinear()
    .range([height, 0])
    .domain([min, max]);

  //to do: memo and separate out
  const maxTicks = 5;

  const ticks = yScale.ticks(maxTicks).map((value) => ({
    value,
    formattedValue: formatValue(value),
    yOffset: yScale(value),
  }));

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
        transform={`translate(${0}, ${Margin.Top})`}
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
      >
        {/* replace 40 with actual calculated left margin */}
        <g
          transform={`translate(${FAKE_YAXIS_WIDTH},${chartDimensions.height -
            Margin.Bottom})`}
        >
          <XAxis data={data} xScale={xScale} dimensions={chartDimensions} />
        </g>

        <g transform={`translate(${Margin.Left},${Margin.Top})`}>
          <YAxis
            ticks={ticks}
            //40 to be replaced with actual max width of labels // need to add the math
            drawableWidth={
              chartDimensions.width - Margin.Right - FAKE_YAXIS_WIDTH
            }
          />
        </g>

        <g transform={`translate(${Margin.Left},${Margin.Top})`}>
          {data.map(({rawValue}, index) => {
            const fill = useSpring({
              config: {duration: 200},
              immediate: !highlightColor || prefersReducedMotion,
              color:
                activeBar === index && highlightColor != null
                  ? tokens[highlightColor]
                  : tokens[color],
              from: {color: tokens[color]},
            });

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
                y={yScale(Math.max(0, rawValue))}
                fill={fill.color}
                width={xScale.bandwidth()}
                height={Math.abs(yScale(rawValue) - yScale(0))}
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

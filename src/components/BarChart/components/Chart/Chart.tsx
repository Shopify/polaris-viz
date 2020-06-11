import React, {useState} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
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
}

const FAKE_YAXIS_WIDTH = 40;

//seperate about and determine if these numbers are best
const Margin = {Top: 20, Right: 20, Bottom: 70, Left: 40};

export function Chart({data, chartDimensions, histogram, color}: Props) {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    // 0 to be replaced with actual max width of labels // need to add the math
    const axisMargin = 20;

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
    formattedValue: value.toString(),
    yOffset: yScale(value),
  }));

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
          <rect width="10" height="10" fill="purple" />
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
          {data.map(({rawValue}, index) => (
            <rect
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
              fill={tokens[color]}
              width={xScale.bandwidth()}
              height={Math.abs(yScale(rawValue) - yScale(0))}
            />
          ))}
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
          {/* to be improved */}
          <strong>{data[activeBar].label}</strong>
          <p>{data[activeBar].formattedValue}</p>
        </TooltipContainer>
      ) : null}
    </div>
  );
}

import React, {useEffect, useRef, useState} from 'react';
import {line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {Margin, Y_SCALE_PADDING} from './constants';
import {Series} from './types';
import {eventPoint, yAxisMinMax} from './utilities';
import {Crosshair, Line, XAxis, YAxis} from './components';

interface Props {
  series: Series[];
  xAxisLabels: string[];
  formatYAxisValue?(value: number): string;
}

export function LineChart({
  series,
  xAxisLabels,
  formatYAxisValue = (value) => `${value}`,
}: Props) {
  const [svgDimensions, setSvgDimensions] = useState<DOMRect>(new DOMRect());
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  function updateDimensions() {
    if (containerRef.current != null) {
      setSvgDimensions(containerRef.current.getBoundingClientRect());
    }
  }

  useEffect(() => {
    if (containerRef.current != null) {
      updateDimensions();
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [containerRef]);

  const longestSeriesLength = series.reduce<number>(
    (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
    0,
  );

  const [minY, maxY] = yAxisMinMax(series);

  const xScale = scaleLinear()
    .range([0, svgDimensions.width - Margin.Left - Margin.Right])
    .domain([0, longestSeriesLength]);

  const yScale = scaleLinear()
    .range([svgDimensions.height - (Margin.Top + Margin.Bottom), 0])
    .domain([Math.min(0, minY), maxY * Y_SCALE_PADDING])
    .nice();

  const lineGenerator = line<{x: string; y: number}>()
    .x((_, index) => xScale(index))
    .y(({y}) => yScale(y));

  function handleInteraction(
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) {
    const point = eventPoint(event);
    if (point == null) {
      return;
    }

    const {svgX} = point;
    if (svgX < Margin.Left) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - Margin.Left));
    setActivePointIndex(closestIndex);
  }

  return (
    <svg
      width="100%"
      height="100%"
      ref={containerRef}
      onMouseMove={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchEnd={() => setActivePointIndex(null)}
      onMouseLeave={() => setActivePointIndex(null)}
    >
      <g transform={`translate(0,${svgDimensions.height - Margin.Bottom})`}>
        <XAxis
          xScale={xScale}
          labels={xAxisLabels}
          dimensions={svgDimensions}
        />
      </g>

      <g transform={`translate(${Margin.Left},${Margin.Top})`}>
        <YAxis
          yScale={yScale}
          formatYAxisValue={formatYAxisValue}
          dimensions={svgDimensions}
        />
      </g>

      {activePointIndex == null ? null : (
        <g transform={`translate(${Margin.Left},${Margin.Top})`}>
          <Crosshair x={xScale(activePointIndex)} dimensions={svgDimensions} />
        </g>
      )}

      <g transform={`translate(${Margin.Left},${Margin.Top})`}>
        {series
          .slice()
          .reverse()
          .map((singleSeries) => {
            const {data, name} = singleSeries;
            const path = lineGenerator(data);

            if (path == null) {
              throw new Error(
                `Could not generate line path for series ${name}`,
              );
            }

            return (
              <Line
                key={name}
                xScale={xScale}
                yScale={yScale}
                series={singleSeries}
                path={path}
                activePointIndex={activePointIndex}
              />
            );
          })}
      </g>
    </svg>
  );
}

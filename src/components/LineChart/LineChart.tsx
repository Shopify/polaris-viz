import React, {useEffect, useRef, useState} from 'react';
import {line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {Margin, Y_SCALE_PADDING} from './constants';
import {ChartDimensions, Series} from './types';
import {yAxisMinMax} from './utilities';
import {Line, XAxis, YAxis} from './components';

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
  const [svgDimensions, setSvgDimensions] = useState<ChartDimensions>({
    width: 0,
    height: 0,
  });
  const containerRef = useRef<SVGSVGElement | null>(null);

  function updateDimensions() {
    if (containerRef.current != null) {
      setSvgDimensions({
        height: containerRef.current.clientHeight,
        width: containerRef.current.clientWidth,
      });
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

  return (
    <svg width="100%" height="100%" ref={containerRef}>
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

      <g transform={`translate(${Margin.Left},${Margin.Top})`}>
        {series
          .slice()
          .reverse()
          .map((singleSeries) => {
            const {data, name} = singleSeries;
            const path = lineGenerator(data);

            if (path == null) {
              throw new Error(
                'Could not generate attribute `d` for path element',
              );
            }

            return <Line key={name} series={singleSeries} path={path} />;
          })}
      </g>
    </svg>
  );
}

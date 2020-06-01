import React, {useState} from 'react';
import {line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {yAxisMinMax, eventPoint} from './utilities';
import {Series} from './types';
import {Margin, Y_SCALE_PADDING} from './constants';
import {Crosshair, Line, Tooltip, XAxis, YAxis} from './components';
import * as styles from './Chart.scss';

interface Props {
  series: Series[];
  xAxisLabels: string[];
  formatYAxisValue(value: number): string;
  dimensions: DOMRect;
}

export function Chart({
  series,
  dimensions,
  xAxisLabels,
  formatYAxisValue,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const longestSeriesLength = series.reduce<number>(
    (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
    0,
  );

  const [minY, maxY] = yAxisMinMax(series);

  const xScale = scaleLinear()
    .range([0, dimensions.width - Margin.Left - Margin.Right])
    .domain([0, longestSeriesLength]);

  const yScale = scaleLinear()
    .range([dimensions.height - (Margin.Top + Margin.Bottom), 0])
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

    const {svgX, clientX, clientY} = point;
    if (svgX < Margin.Left) {
      return;
    }

    const closestIndex = Math.round(xScale.invert(svgX - Margin.Left));
    setActivePointIndex(Math.min(longestSeriesLength, closestIndex));
    setTooltipPosition({
      x: clientX - dimensions.left,
      y: clientY - dimensions.top,
    });
  }

  return (
    <div className={styles.Container}>
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleInteraction}
        onTouchMove={handleInteraction}
        onTouchEnd={() => setActivePointIndex(null)}
        onMouseLeave={() => setActivePointIndex(null)}
      >
        <g transform={`translate(0,${dimensions.height - Margin.Bottom})`}>
          <XAxis xScale={xScale} labels={xAxisLabels} dimensions={dimensions} />
        </g>

        <g transform={`translate(${Margin.Left},${Margin.Top})`}>
          <YAxis
            yScale={yScale}
            formatYAxisValue={formatYAxisValue}
            dimensions={dimensions}
          />
        </g>

        {activePointIndex == null ? null : (
          <g transform={`translate(${Margin.Left},${Margin.Top})`}>
            <Crosshair x={xScale(activePointIndex)} dimensions={dimensions} />
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

      {tooltipPosition == null || activePointIndex == null ? null : (
        <Tooltip
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          formatYAxisValue={formatYAxisValue}
          series={series}
          chartDimensions={dimensions}
        />
      )}
    </div>
  );
}

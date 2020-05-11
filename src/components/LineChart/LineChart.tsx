import React, {useEffect, useRef, useState} from 'react';
import {line} from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {Margin, Y_SCALE_PADDING} from './constants';
import {Series} from './types';
import {eventPoint, yAxisMinMax} from './utilities';
import {Crosshair, Legend, Line, Tooltip, XAxis, YAxis} from './components';
import * as styles from './LineChart.scss';

interface Props {
  series: Series[];
  xAxisLabels: string[];
  height?: string | number;
  formatYAxisValue?(value: number): string;
}

export function LineChart({
  series,
  xAxisLabels,
  height = 250,
  formatYAxisValue = (value) => `${value}`,
}: Props) {
  const [chartDimensions, setChartDimensions] = useState<DOMRect>(
    new DOMRect(),
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function updateDimensions() {
    if (containerRef.current != null) {
      setChartDimensions(containerRef.current.getBoundingClientRect());
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
    .range([0, chartDimensions.width - Margin.Left - Margin.Right])
    .domain([0, longestSeriesLength]);

  const yScale = scaleLinear()
    .range([chartDimensions.height - (Margin.Top + Margin.Bottom), 0])
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
    setActivePointIndex(closestIndex);
    setTooltipPosition({
      x: clientX - chartDimensions.left,
      y: clientY - chartDimensions.top,
    });
  }

  return (
    <React.Fragment>
      <div className={styles.Container} style={{height}} ref={containerRef}>
        <svg
          width="100%"
          height="100%"
          onMouseMove={handleInteraction}
          onTouchMove={handleInteraction}
          onTouchEnd={() => setActivePointIndex(null)}
          onMouseLeave={() => setActivePointIndex(null)}
        >
          <g
            transform={`translate(0,${chartDimensions.height - Margin.Bottom})`}
          >
            <XAxis
              xScale={xScale}
              labels={xAxisLabels}
              dimensions={chartDimensions}
            />
          </g>

          <g transform={`translate(${Margin.Left},${Margin.Top})`}>
            <YAxis
              yScale={yScale}
              formatYAxisValue={formatYAxisValue}
              dimensions={chartDimensions}
            />
          </g>

          {activePointIndex == null ? null : (
            <g transform={`translate(${Margin.Left},${Margin.Top})`}>
              <Crosshair
                x={xScale(activePointIndex)}
                dimensions={chartDimensions}
              />
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
          />
        )}
      </div>

      <Legend series={series} />
    </React.Fragment>
  );
}

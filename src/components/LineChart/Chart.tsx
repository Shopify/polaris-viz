import React, {useState} from 'react';
import {line} from 'd3-shape';
import {SPACING_TIGHT} from 'components/constants';

import {LinearXAxis} from '../LinearXAxis';
import {YAxis} from '../YAxis';
import {eventPoint} from '../../utilities';
import {Crosshair} from '../Crosshair';

import {Series} from './types';
import {Margin} from './constants';
import {useXScale, useYScale} from './hooks';
import {Line, Tooltip} from './components';
import styles from './Chart.scss';

interface Props {
  series: Series[];
  xAxisLabels?: string[];
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

  const marginBottom = xAxisLabels == null ? SPACING_TIGHT : Margin.Bottom;
  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const {axisMargin, ticks, yScale} = useYScale({
    drawableHeight,
    series,
    formatYAxisValue,
  });

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;
  const longestSeriesLength = series.reduce<number>(
    (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
    0,
  );

  const {xScale} = useXScale({drawableWidth, longestSeriesLength});

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

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

    const closestIndex = Math.round(xScale.invert(svgX - axisMargin));
    setActivePointIndex(Math.min(longestSeriesLength, closestIndex));
    setTooltipPosition({
      x: svgX,
      y: svgY,
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
        <g
          transform={`translate(${axisMargin},${dimensions.height -
            marginBottom})`}
        >
          <LinearXAxis
            xScale={xScale}
            labels={xAxisLabels}
            dimensions={dimensions}
            drawableHeight={drawableHeight}
            axisMargin={axisMargin}
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        {activePointIndex == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair x={xScale(activePointIndex)} height={drawableHeight} />
          </g>
        )}

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
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

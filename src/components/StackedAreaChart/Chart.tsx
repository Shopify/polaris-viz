import React, {useState, useMemo} from 'react';
import {stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';

import {eventPoint} from '../../utilities';
import {YAxis} from '../YAxis';
import {Crosshair} from '../Crosshair';
import {Point} from '../Point';
import {LinearXAxis} from '../LinearXAxis';
import {StringLabelFormatter, NumberLabelFormatter} from '../../types';

import {Margin, Spacing} from './constants';
import {useXScale, useYScale} from './hooks';
import {Tooltip, StackedAreas} from './components';
import styles from './Chart.scss';
import {Series} from './types';

interface Props {
  xAxisLabels: string[];
  series: Series[];
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  dimensions: DOMRect;
  tooltipSumDescriptor?: string;
  opacity: number;
  isAnimated: boolean;
}

export function Chart({
  xAxisLabels,
  series,
  dimensions,
  formatXAxisLabel,
  formatYAxisLabel,
  tooltipSumDescriptor,
  opacity,
  isAnimated,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const areaStack = useMemo(
    () =>
      stack()
        .keys(series.map(({label}) => label))
        .order(stackOrderReverse)
        .offset(stackOffsetNone),
    [series],
  );

  const formattedData = useMemo(
    () =>
      xAxisLabels.map((_, labelIndex) =>
        series.reduce((acc, {label, data}) => {
          const value = data[labelIndex];

          const dataPoint = {[label]: value};
          return Object.assign(acc, dataPoint);
        }, {}),
      ),
    [xAxisLabels, series],
  );

  const formattedXAxisLabels = xAxisLabels.map(formatXAxisLabel);

  const stackedValues = useMemo(() => areaStack(formattedData), [
    areaStack,
    formattedData,
  ]);

  const colors = useMemo(() => series.map(({color}) => color), [series]);

  const marginBottom = xAxisLabels == null ? Spacing.Tight : Margin.Bottom;
  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const {axisMargin, ticks, yScale} = useYScale({
    drawableHeight,
    stackedValues,
    formatYAxisLabel,
  });

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;

  const longestSeriesLength =
    Math.max(...stackedValues.map((stack) => stack.length)) - 1;

  const {xScale} = useXScale({drawableWidth, longestSeriesLength});

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
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
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8f8f8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fc00ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#f8f8f8" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05a" />
            <stop offset="100%" stopColor="#0a5" />
          </linearGradient>
        </defs>

        <g
          transform={`translate(${axisMargin},${dimensions.height -
            marginBottom})`}
        >
          <LinearXAxis
            xScale={xScale}
            labels={formattedXAxisLabels}
            dimensions={dimensions}
            drawableHeight={drawableHeight}
            axisMargin={axisMargin}
          />
        </g>

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          <YAxis ticks={ticks} drawableWidth={drawableWidth} />
        </g>

        <StackedAreas
          width={drawableWidth}
          height={drawableHeight}
          transform={`translate(${axisMargin},${Margin.Top})`}
          stackedValues={stackedValues}
          xScale={xScale}
          yScale={yScale}
          colors={colors}
          opacity={opacity}
          isAnimated={isAnimated}
        />

        {/* {activePointIndex == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair
              x={xScale(activePointIndex)}
              height={drawableHeight}
              opacity={0.5}
            />
          </g>
        )} */}

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {stackedValues.map((value, stackIndex) =>
            value.map(([, startingDataPoint], index) => (
              <Point
                key={index}
                color={colors[stackIndex]}
                cx={xScale(index)}
                cy={yScale(startingDataPoint)}
                active={index === activePointIndex}
              />
            )),
          )}
        </g>
      </svg>
      {tooltipPosition == null || activePointIndex == null ? null : (
        <Tooltip
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          chartDimensions={dimensions}
          data={formattedData}
          colors={colors}
          tooltipSumDescriptor={tooltipSumDescriptor}
          formatYAxisLabel={formatYAxisLabel}
        />
      )}
    </div>
  );

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
}

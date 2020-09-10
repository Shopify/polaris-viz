import React, {useState, useMemo} from 'react';
import {area, stack, stackOffsetDiverging} from 'd3-shape';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import {YAxis} from '../YAxis';
import {eventPoint} from '../../utilities';
import {Crosshair} from '../Crosshair';
import {Point} from '../Point';

import {Margin, SPACING_TIGHT} from './constants';
import {useXScale, useYScale} from './hooks';
import {Area, Tooltip, XAxis} from './components';
import styles from './Chart.scss';

interface Props {
  xAxisLabels: string[];
  series: {name: string; data: number[]; color: Color}[];
  formatYAxisValue(value: number): string;
  dimensions: DOMRect;
}

export function Chart({
  xAxisLabels,
  series,
  dimensions,
  formatYAxisValue,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const keys = series.map(({name}) => name);

  const areaStack = useMemo(
    () =>
      stack()
        .keys(keys)
        // does this offset make the most sense?
        // without it, negatives aren't really shown accurately
        // with it, we can get some awkward shapes but they are at least accurate
        .offset(stackOffsetDiverging),
    [],
  );

  const formattedData = useMemo(
    () =>
      xAxisLabels.map((_, labelIndex) =>
        series
          // .slice()
          // .reverse()
          .reduce(
            (acc, {name, data}) =>
              Object.assign(acc, {[name]: data[labelIndex]}),
            {},
          ),
      ),
    [],
  );

  const colors = series.map(({color}) => color);

  const stackedValues = useMemo(() => areaStack(formattedData), []);

  const marginBottom = xAxisLabels == null ? SPACING_TIGHT : Margin.Bottom;
  const drawableHeight = dimensions.height - Margin.Top - marginBottom;

  const {axisMargin, ticks, yScale} = useYScale({
    drawableHeight,
    stackedValues,
    formatYAxisValue,
  });

  const drawableWidth =
    axisMargin == null ? null : dimensions.width - Margin.Right - axisMargin;
  const longestSeriesLength =
    Math.max(...stackedValues.map((stack) => stack.length)) - 1;

  const {xScale} = useXScale({drawableWidth, longestSeriesLength});

  if (xScale == null || drawableWidth == null || axisMargin == null) {
    return null;
  }

  const areaShape = area<number[]>()
    .x((_, index) => xScale(index))
    .y0(([firstPoint]) => yScale(firstPoint))
    .y1(([, lastPoint]) => yScale(lastPoint));

  const zeroShape = areaShape(Array(formattedData.length).fill([0, 0]));

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
          <XAxis
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

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {stackedValues.map((value, index) => {
            const shape = areaShape(value);

            if (shape == null || zeroShape == null) {
              return null;
            }

            return (
              <Area
                zeroShape={zeroShape}
                key={index}
                shape={shape}
                fill={tokens[colors[index]]}
              />
            );
          })}
        </g>

        {activePointIndex == null ? null : (
          <g transform={`translate(${axisMargin},${Margin.Top})`}>
            <Crosshair
              x={xScale(activePointIndex)}
              height={drawableHeight}
              opacity={0.5}
            />
          </g>
        )}

        <g transform={`translate(${axisMargin},${Margin.Top})`}>
          {stackedValues.map((value, stackIndex) => {
            return value.map(([, dataPoint], index) => (
              <Point
                key={index}
                color={colors[stackIndex]}
                cx={xScale(index)}
                cy={yScale(dataPoint)}
                active={index === activePointIndex}
              />
            ));
          })}
        </g>
      </svg>
      {tooltipPosition == null || activePointIndex == null ? null : (
        <Tooltip
          activePointIndex={activePointIndex}
          currentX={tooltipPosition.x}
          currentY={tooltipPosition.y}
          formatYAxisValue={formatYAxisValue}
          chartDimensions={dimensions}
          data={formattedData}
          colors={colors}
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

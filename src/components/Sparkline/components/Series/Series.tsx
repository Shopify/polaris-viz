import React, {useMemo, useRef} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area, line} from 'd3-shape';

import {LinearGradient} from '../../../LinearGradient';
import {
  curveStepRounded,
  getColorValue,
  uniqueId,
  rgbToRgba,
  classNames,
  isGradientType,
  makeColorOpaque,
} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import type {SingleSeries, Coordinates} from '../../Sparkline';

import styles from './Series.scss';

const POINT_RADIUS = 2;

export function Series({
  xScale,
  yScale,
  series,
  isAnimated,
  height,
  hasSpline,
  strokeWidth,
}: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  series: SingleSeries;
  isAnimated: boolean;
  height: number;
  hasSpline: boolean;
  strokeWidth: number;
}) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const gradientId = useRef(uniqueId('lineChartGradient'));

  const {
    areaStyle = 'none',
    lineStyle = 'solid',
    color = 'colorTeal',
    hasPoint = false,
    data,
  } = series;

  const lineGenerator = line<Coordinates>()
    .x(({x}) => xScale(x))
    .y(({y}) => (y == null ? yScale(0) : yScale(y)))
    .defined(({y}) => y != null);

  const areaGenerator = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y0(height)
    .y1(({y}) => (y == null ? yScale(0) : yScale(y)))
    .defined(({y}) => y != null);

  if (hasSpline) {
    lineGenerator.curve(curveStepRounded);
    areaGenerator.curve(curveStepRounded);
  }

  const lineShape = lineGenerator(data);
  const [lastLinePoint] = data.filter(({y}) => y != null).slice(-1);

  const lastLinePointCoordinates =
    lastLinePoint.y != null
      ? {
          x: xScale(lastLinePoint.x),
          y: yScale(lastLinePoint.y),
        }
      : null;

  const areaShape = areaGenerator(data);

  const id = useMemo(() => uniqueId('sparkline'), []);
  const immediate = !isAnimated || prefersReducedMotion;

  const seriesGradientId = `${gradientId.current}`;

  const lineColor = isGradientType(color)
    ? `url(#${seriesGradientId})`
    : getColorValue(color);

  const singleColor = isGradientType(color)
    ? makeColorOpaque(color[1].color)
    : getColorValue(color);

  const dashedLine = lineStyle === 'dashed';

  if (lineShape == null || areaShape == null) {
    return null;
  }

  return (
    <React.Fragment>
      {isGradientType(color) ? (
        <LinearGradient
          id={seriesGradientId}
          gradient={color}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />
      ) : null}

      {areaStyle === 'gradient' ? (
        <LinearGradient
          id={id}
          gradient={[
            {
              color: rgbToRgba({rgb: singleColor, alpha: 0}),
              offset: 0,
            },
            {
              color: rgbToRgba({rgb: singleColor, alpha: 0.8}),
              offset: 100,
            },
          ]}
        />
      ) : null}

      <path
        stroke={lineColor}
        strokeWidth={strokeWidth}
        d={lineShape}
        fill="none"
        className={classNames(
          styles.Line,
          !immediate && styles.AnimatedLine,
          dashedLine && styles.DashedLine,
        )}
      />

      {areaStyle === 'none' ? null : (
        <path
          fill={areaStyle === 'gradient' ? `url(#${id})` : lineColor}
          d={areaShape}
          className={immediate ? undefined : styles.Area}
        />
      )}

      {hasPoint && lastLinePointCoordinates != null ? (
        <circle
          cx={lastLinePointCoordinates.x}
          cy={lastLinePointCoordinates.y}
          r={POINT_RADIUS}
          fill={lineColor}
          className={styles.Point}
        />
      ) : null}
    </React.Fragment>
  );
}

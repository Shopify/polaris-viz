import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area, curveMonotoneX, line} from 'd3-shape';
import {classNames} from '@shopify/css-utilities';

import {LinearGradient} from '../../../LinearGradient';
import {getColorValue, uniqueId, rgbToRgba} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import {SingleSeries, Coordinates} from '../../Sparkline';

import styles from './Series.scss';

const POINT_RADIUS = 2;

export function Series({
  xScale,
  yScale,
  series,
  isAnimated,
  height,
  hasSpline,
}: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  series: SingleSeries;
  isAnimated: boolean;
  height: number;
  hasSpline: boolean;
}) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
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
    lineGenerator.curve(curveMonotoneX);
    areaGenerator.curve(curveMonotoneX);
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

  const colorValue = getColorValue(color);
  const dashedLine = lineStyle === 'dashed';

  if (lineShape == null || areaShape == null) {
    return null;
  }

  return (
    <React.Fragment>
      <path
        stroke={colorValue}
        d={lineShape}
        fill="none"
        className={classNames(
          styles.Line,
          !immediate && styles.AnimatedLine,
          dashedLine && styles.DashedLine,
        )}
      />
      {areaStyle === 'gradient' ? (
        <LinearGradient
          id={id}
          gradient={[
            {
              color: rgbToRgba({rgb: colorValue, alpha: 0}),
              offset: 0,
            },
            {
              color: rgbToRgba({rgb: colorValue, alpha: 0.8}),
              offset: 100,
            },
          ]}
        />
      ) : null}
      {areaStyle === 'none' ? null : (
        <path
          fill={areaStyle === 'gradient' ? `url(#${id})` : colorValue}
          d={areaShape}
          className={immediate ? null : styles.Area}
        />
      )}

      {hasPoint && lastLinePointCoordinates != null ? (
        <circle
          cx={lastLinePointCoordinates.x}
          cy={lastLinePointCoordinates.y}
          r={POINT_RADIUS}
          fill={colorValue}
          className={styles.Point}
        />
      ) : null}
    </React.Fragment>
  );
}

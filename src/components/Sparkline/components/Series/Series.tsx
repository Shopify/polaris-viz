import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {getColorValue, uniqueId, rgbToRgba} from '../../../../utilities';
import {usePrefersReducedMotion} from '../../../../hooks';
import {SingleSeries, Coordinates} from '../../Sparkline';
import {LinearGradient} from '../LinearGradient';

import styles from './Series.scss';

const STROKE_WIDTH = 1.5;

export function Series({
  xScale,
  yScale,
  series,
  isAnimated = false,
  height,
}: {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  series: SingleSeries;
  isAnimated?: boolean;
  height: number;
}) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const {
    areaStyle = 'none',
    lineStyle = 'solid',
    color = 'colorTeal',
    data,
  } = series;

  const lineShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y(({y}) => yScale(y))(data);

  const areaShape = area<Coordinates>()
    .x(({x}) => xScale(x))
    .y0(height)
    .y1(({y}) => yScale(y))(data);

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
        strokeWidth={STROKE_WIDTH}
        d={lineShape}
        strokeDasharray={dashedLine ? '2 4' : ''}
        className={immediate ? null : styles.Path}
      />

      {areaStyle === 'gradient' ? (
        <LinearGradient
          id={id}
          startColor={rgbToRgba({rgb: colorValue, alpha: 0})}
          endColor={rgbToRgba({rgb: colorValue, alpha: 0.8})}
        />
      ) : null}

      {areaStyle === 'none' ? null : (
        <path
          fill={areaStyle === 'gradient' ? `url(#${id})` : color}
          d={areaShape}
          className={immediate ? null : styles.Area}
        />
      )}
    </React.Fragment>
  );
}

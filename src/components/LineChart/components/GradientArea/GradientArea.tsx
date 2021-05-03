import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area, curveMonotoneX} from 'd3-shape';

import {uniqueId, getColorValue, rgbToRgba} from '../../../../utilities';
import {ANIMATION_DELAY, SLOW_DURATION, FAST_DURATION} from '../../constants';
import {Data} from '../../../../types';
import {Series} from '../../types';

import {getGradientDetails} from './utilities/get-gradient-details';
import styles from './GradientArea.scss';

interface Props {
  series: Series;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number>;
  hasSpline: boolean;
  isAnimated: boolean;
  index: number;
}

export function GradientArea({
  series,
  yScale,
  xScale,
  hasSpline,
  isAnimated,
  index,
}: Props) {
  const id = useMemo(() => uniqueId('gradient'), []);
  const {data, color} = series;

  const areaGenerator = area<Data>()
    .x((_: Data, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({rawValue}: {rawValue: number}) => yScale(rawValue));

  if (hasSpline) {
    areaGenerator.curve(curveMonotoneX);
  }

  const areaShape = areaGenerator(data);

  if (areaShape == null || color == null) {
    return null;
  }

  const rgb = getColorValue(color);
  const gradientStops = getGradientDetails(data);
  const animationDelay =
    data.length > 1000
      ? index * ANIMATION_DELAY + SLOW_DURATION
      : index * ANIMATION_DELAY + FAST_DURATION;

  return (
    <React.Fragment>
      <defs>
        <linearGradient id={`${id}`} x1="0%" x2="0%" y1="0%" y2="100%">
          {gradientStops.map(({percent, alpha}) => (
            <stop
              key={percent}
              offset={`${percent}%`}
              stopColor={rgbToRgba({rgb, alpha})}
            />
          ))}
        </linearGradient>

        <linearGradient id="fadeGrad" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="1%" stop-color="white" stop-opacity="0.5" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>

        <mask id="fade">
          <path d={areaShape} fill="url(#fadeGrad)" />
        </mask>
      </defs>

      <path
        d={areaShape}
        style={{
          animationDelay: `${animationDelay}s`,
        }}
        fill={`url(#${id})`}
        strokeWidth="0"
        stroke={series.color}
        className={isAnimated ? styles.FadeInArea : null}
        mask="url(#fade)"
      />
    </React.Fragment>
  );
}

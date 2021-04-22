import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area, curveMonotoneX} from 'd3-shape';

import {uniqueId} from '../../../../utilities';
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
  const {data, areaColor} = series;

  const areaGenerator = area<Data>()
    .x((_: Data, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({rawValue}: {rawValue: number}) => yScale(rawValue));

  if (hasSpline) {
    areaGenerator.curve(curveMonotoneX);
  }

  const areaShape = areaGenerator(data);

  if (areaShape == null) {
    return null;
  }

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
              stopColor={areaColor}
              stopOpacity={alpha}
            />
          ))}
        </linearGradient>
      </defs>

      <path
        d={areaShape}
        style={{
          animationDelay: `${animationDelay}s`,
        }}
        fill={`url(#${id})`}
        strokeWidth="0"
        stroke={areaColor}
        className={isAnimated ? styles.FadeInArea : null}
      />
    </React.Fragment>
  );
}

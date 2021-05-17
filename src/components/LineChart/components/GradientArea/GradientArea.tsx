import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {LinearGradient} from '../../../../components';
import {uniqueId, curveStepRounded} from '../../../../utilities';
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
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);
  const {data, areaColor} = series;

  const areaGenerator = area<Data>()
    .x((_: Data, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({rawValue}: {rawValue: number}) => yScale(rawValue));

  if (hasSpline) {
    areaGenerator.curve(curveStepRounded);
  }

  const areaShape = areaGenerator(data);

  if (areaShape == null || areaColor == null) {
    return null;
  }

  const gradientStops = getGradientDetails(data).map((gradientStop) => ({
    ...gradientStop,
    color: areaColor,
  }));

  const animationDelay =
    data.length > 1000
      ? index * ANIMATION_DELAY + SLOW_DURATION
      : index * ANIMATION_DELAY + FAST_DURATION;

  return (
    <React.Fragment>
      <defs>
        <mask id={maskId}>
          <path d={areaShape} fill={`url(#${maskId}-gradient)`} />
        </mask>
        <LinearGradient
          id={`${maskId}-gradient`}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
          gradient={[
            {
              offset: 0,
              color: 'black',
            },
            {
              offset: 10,
              color: 'white',
            },
            {
              offset: 90,
              color: 'white',
            },
            {
              offset: 100,
              color: 'black',
            },
          ]}
        />
        <LinearGradient
          id={gradientId}
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
          gradient={gradientStops}
        />
      </defs>

      <g
        className={isAnimated ? styles.FadeInArea : null}
        style={{
          animationDelay: `${animationDelay}s`,
        }}
      >
        <path
          d={areaShape}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          strokeWidth="0"
          stroke={areaColor}
        />
      </g>
    </React.Fragment>
  );
}

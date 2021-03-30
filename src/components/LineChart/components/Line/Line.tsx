import React from 'react';

import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';
import {ANIMATION_DELAY, FAST_DURATION, SLOW_DURATION} from '../../constants';

import styles from './Line.scss';
import {StrokeDasharray} from './constants';

interface Props {
  series: Required<Series>;
  isAnimated: boolean;
  index: number;
  lineGenerator: any;
}

export const Line = React.memo(function Shape({
  series,
  isAnimated,
  index,
  lineGenerator,
}: Props) {
  const path = lineGenerator(series.data);

  const animationDelay = index * ANIMATION_DELAY;
  const animationDuration =
    series.data.length > 1000 ? SLOW_DURATION : FAST_DURATION;

  if (path == null) {
    return null;
  }

  return (
    <path
      d={path}
      style={{
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
      }}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={getColorValue(series.color)}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={StrokeDasharray[series.lineStyle]}
      className={isAnimated ? styles.AnimatedPath : null}
    />
  );
});

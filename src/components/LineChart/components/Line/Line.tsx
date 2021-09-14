import React from 'react';
import type {Line as D3Line} from 'd3-shape';

import {useTheme} from '../../../../hooks';
import type {SeriesWithDefaults} from '../../types';
import {ANIMATION_DELAY, FAST_DURATION, SLOW_DURATION} from '../../constants';

import styles from './Line.scss';
import {StrokeDasharray} from './constants';

interface Props {
  series: SeriesWithDefaults;
  isAnimated: boolean;
  index: number;
  lineGenerator: D3Line<{rawValue: number}>;
  color: string;
  theme?: string;
}

export const Line = React.memo(function Shape({
  series,
  isAnimated,
  index,
  lineGenerator,
  color,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);
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
      strokeWidth={`${selectedTheme.line.width}px`}
      paintOrder="stroke"
      stroke={color}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={StrokeDasharray[series.lineStyle]}
      className={isAnimated ? styles.AnimatedPath : undefined}
    />
  );
});

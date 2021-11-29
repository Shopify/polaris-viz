import React, {ReactNode} from 'react';
import type {Line as D3Line} from 'd3-shape';
import {useSpring, animated} from '@react-spring/web';

import type {DataPoint, DataSeries, LineStyle} from '../../../../types';
import {useTheme} from '../../../../hooks';
import {ANIMATION_DELAY} from '../../constants';
import {LINES_LOAD_ANIMATION_CONFIG} from '../../../../constants';

import {StrokeDasharray} from './constants';

export interface Props {
  series: DataSeries;
  isAnimated: boolean;
  index: number;
  lineGenerator: D3Line<DataPoint>;
  color: string;

  children?: ReactNode;
  theme?: string;
}

export const Line = React.memo(function Shape({
  series,
  isAnimated,
  index,
  lineGenerator,
  color,
  theme,
  children,
}: Props) {
  const selectedTheme = useTheme(theme);
  const path = lineGenerator(series.data);

  const isSolidLine = series.isComparison !== true;
  const lineStyle: LineStyle = series.isComparison ? 'dotted' : 'solid';

  const styles = useSpring({
    from: isSolidLine ? {transform: 'scaleY(0)'} : {opacity: 0},
    to: isSolidLine ? {transform: 'scaleY(1)'} : {opacity: 1},
    delay: isSolidLine ? index * ANIMATION_DELAY : 0,
    duration: 500,
    config: LINES_LOAD_ANIMATION_CONFIG,
  });

  if (path == null) {
    return null;
  }

  return (
    <animated.g
      style={
        isAnimated ? {...styles, transformOrigin: 'bottom center'} : undefined
      }
    >
      <path
        d={path}
        fill="none"
        strokeWidth={`${selectedTheme.line.width}px`}
        paintOrder="stroke"
        stroke={color}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={StrokeDasharray[lineStyle]}
      />
      {children}
    </animated.g>
  );
});

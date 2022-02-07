import React, {ReactNode} from 'react';
import type {Line as D3Line} from 'd3-shape';
import {useSpring, animated} from '@react-spring/web';

import type {DataPoint, DataSeries, LineStyle} from '../../../../types';
import {
  getColorBlindEventAttrs,
  getOpacityStylesForActive,
  useTheme,
} from '../../../../hooks';
import {ANIMATION_DELAY} from '../../constants';
import {
  COLOR_BLIND_SINGLE_LINE,
  LINES_LOAD_ANIMATION_CONFIG,
} from '../../../../constants';

import {StrokeDasharray} from './constants';
import styles from './Line.scss';

export interface Props {
  activeLineIndex: number;
  series: DataSeries;
  isAnimated: boolean;
  index: number;
  lineGenerator: D3Line<DataPoint>;
  color: string;

  children?: ReactNode;
  theme?: string;
}

export const Line = React.memo(function Shape({
  activeLineIndex,
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

  const spring = useSpring({
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
      className={styles.Group}
      style={isAnimated ? {...spring, transformOrigin: 'bottom center'} : {}}
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
        style={getOpacityStylesForActive({
          activeIndex: activeLineIndex,
          index,
        })}
      />
      {children}
      <path
        className={styles.Line}
        d={path}
        strokeWidth={`${10}px`}
        paintOrder="stroke"
        stroke="transparent"
        fill="none"
        {...getColorBlindEventAttrs({
          type: COLOR_BLIND_SINGLE_LINE,
          index,
        })}
        style={{pointerEvents: 'auto'}}
        aria-hidden="true"
        tabIndex={-1}
      />
    </animated.g>
  );
});

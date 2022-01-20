import React, {useCallback} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {getRoundedRectPath} from '../../../utilities';
import {DataType, Direction, RoundedBorder} from '../../../types';
import {BARS_TRANSITION_CONFIG} from '../../../constants';

import styles from './Bar.scss';

export interface BarProps {
  color: string;
  height: number;
  tabIndex: number;
  width: number;
  x: number;
  y: number;
  animationDirection?: Direction;
  animationDelay?: number;
  ariaLabel?: string;
  index?: number;
  isAnimated?: boolean;
  needsMinWidth?: boolean;
  role?: string;
  roundedBorder?: RoundedBorder;
  transform?: string;
}

export const Bar = React.memo(function Bar({
  animationDirection = 'horizontal',
  animationDelay = 0,
  ariaLabel,
  color,
  height,
  index,
  isAnimated,
  needsMinWidth = false,
  role,
  roundedBorder = RoundedBorder.None,
  tabIndex,
  transform,
  width,
  x,
  y,
}: BarProps) {
  const getPath = useCallback(
    (height = 0, width = 0) => {
      return getRoundedRectPath({height, width, needsMinWidth, roundedBorder});
    },
    [needsMinWidth, roundedBorder],
  );

  const initialHeight = animationDirection === 'horizontal' ? height : 0;
  const initialWidth = animationDirection === 'horizontal' ? 0 : width;

  const spring = useSpring<{pathD: string}>({
    from: {pathD: getPath(initialHeight, initialWidth)},
    to: {pathD: getPath(height, width)},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <g className={styles.Group}>
      <animated.path
        d={spring.pathD}
        data-id={`bar-${index}`}
        data-index={index}
        data-type={DataType.Bar}
        fill={color}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        role={role}
        style={{
          transform: `translate(${x}px, ${y}px) ${transform}`,
        }}
        className={styles.Bar}
      />
    </g>
  );
});

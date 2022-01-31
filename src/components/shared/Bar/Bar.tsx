import React, {useCallback} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {
  COLOR_BLIND_ACTIVE_OPACITY,
  COLOR_BLIND_FADED_OPACITY,
  BARS_TRANSITION_CONFIG,
} from '../../../constants';
import {getRoundedRectPath} from '../../../utilities';
import {DataType, Direction, RoundedBorder} from '../../../types';

import styles from './Bar.scss';

export interface BarProps {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
  animationDirection?: Direction;
  animationDelay?: number;
  index?: number;
  isActive?: boolean;
  isAnimated?: boolean;
  needsMinWidth?: boolean;
  roundedBorder?: RoundedBorder;
  transform?: string;
}

export const Bar = React.memo(function Bar({
  animationDelay = 0,
  animationDirection = 'horizontal',
  color,
  height,
  index,
  isActive = true,
  isAnimated,
  needsMinWidth = false,
  roundedBorder = RoundedBorder.None,
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
    <g className={styles.Group} aria-hidden="true">
      <animated.path
        d={spring.pathD}
        data-id={`bar-${index}`}
        data-index={index}
        data-type={DataType.Bar}
        fill={color}
        aria-hidden="true"
        style={{
          transform: `translate(${x}px, ${y}px) ${transform}`,
          opacity: isActive
            ? COLOR_BLIND_ACTIVE_OPACITY
            : COLOR_BLIND_FADED_OPACITY,
        }}
        className={styles.Bar}
      />
    </g>
  );
});

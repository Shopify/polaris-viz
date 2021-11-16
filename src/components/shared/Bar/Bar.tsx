import React, {useCallback} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {getRoundedRectPath} from '../../../utilities';
import {DataType, RoundedBorder} from '../../../types';
import {BARS_TRANSITION_CONFIG} from '../../../constants';

import styles from './Bar.scss';

export interface BarProps {
  color: string;
  height: number;
  tabIndex: number;
  width: number;
  x: number;
  y: number;
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
    (height: number, width: number) => {
      return getRoundedRectPath({height, width, needsMinWidth, roundedBorder});
    },
    [needsMinWidth, roundedBorder],
  );

  const spring = useSpring<{transform: string}>({
    from: {transform: 'scaleX(0) translateZ(0)'},
    to: {transform: 'scaleX(1) translateZ(0)'},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g className={styles.Group} style={{transform: spring.transform}}>
      <path
        d={getPath(height, width)}
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
    </animated.g>
  );
});

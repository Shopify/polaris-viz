import React, {useMemo} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  BORDER_RADIUS,
  DataType,
  getRoundedRectPath,
} from '@shopify/polaris-viz-core';

import {BARS_TRANSITION_CONFIG} from '../../../../constants';

import styles from './Bar.scss';

interface Props {
  color: string;
  height: number;
  index: number;
  rawValue: number;
  width: number;
  x: number;
  zeroPosition: number;
  animationDelay?: number;
  ariaLabel?: string;
  borderRadius?: string;
  isAnimated?: boolean;
  role?: string;
}

export const Bar = React.memo(function Bar({
  animationDelay = 0,
  ariaLabel,
  borderRadius = BORDER_RADIUS.None,
  color,
  height,
  index,
  isAnimated = true,
  rawValue,
  role,
  width,
  x,
  zeroPosition,
}: Props) {
  const treatAsNegative = rawValue < 0 || rawValue === 0;

  const yPosition = useMemo(() => {
    return treatAsNegative ? zeroPosition + height : zeroPosition - height;
  }, [height, treatAsNegative, zeroPosition]);

  const style = useMemo(() => {
    if (yPosition == null) return;

    const translate = `translate(${
      treatAsNegative ? x + width : x
    }px, ${yPosition}px)`;

    const rotate = `rotate(${treatAsNegative ? 180 : 0}deg)`;

    return {
      transform: ` ${translate} ${rotate}`,
    };
  }, [yPosition, treatAsNegative, x, width]);

  const path = getRoundedRectPath({
    borderRadius,
    height,
    width,
  });

  const {transform} = useSpring({
    from: {transform: 'scaleY(0) translateZ(0)'},
    to: {transform: 'scaleY(1) translateZ(0)'},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g
      style={{
        transform,
        transformOrigin: `0px ${zeroPosition}px`,
      }}
      aria-hidden="true"
    >
      <path
        data-id={`bar-${index}`}
        data-index={index}
        data-type={DataType.Bar}
        d={path}
        fill={color}
        aria-label={ariaLabel}
        role={role}
        style={style}
        className={styles.Bar}
        aria-hidden="true"
      />
    </animated.g>
  );
});

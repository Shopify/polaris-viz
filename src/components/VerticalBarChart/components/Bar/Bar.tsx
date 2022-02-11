import React, {useMemo} from 'react';
import {animated, useSpring} from '@react-spring/web';

import {DataType} from '../../../../types';
import {
  ROUNDED_BAR_RADIUS,
  BARS_TRANSITION_CONFIG,
} from '../../../../constants';

import styles from './Bar.scss';

interface Props {
  color: string;
  x: number;
  rawValue: number;
  width: number;
  index: number;
  rotateZeroBars: boolean;
  height: number;
  zeroPosition: number;
  ariaLabel?: string;
  role?: string;
  hasRoundedCorners?: boolean;
  animationDelay?: number;
  isAnimated?: boolean;
}

export const Bar = React.memo(function Bar({
  color,
  x,
  rawValue,
  width,
  index,
  ariaLabel,
  role,
  height,
  hasRoundedCorners,
  rotateZeroBars,
  animationDelay = 0,
  zeroPosition,
  isAnimated = true,
}: Props) {
  const treatAsNegative = rawValue < 0 || (rawValue === 0 && rotateZeroBars);

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

  const path = useMemo(() => {
    const radius = hasRoundedCorners
      ? Math.min(ROUNDED_BAR_RADIUS, width / 2)
      : 0;

    const radiusOffset = Math.max(0, radius - height);

    return height === 0
      ? ''
      : `M${radius} 0
        h${width - radius * 2}
        a${radius} ${radius} 0 0 1 ${radius} ${radius - radiusOffset}
        v${radiusOffset > 0 ? 0 : height - radius}
        H0
        V${radius - radiusOffset}
        a${radius} ${radius} 0 0 1 ${radius} -${radius - radiusOffset}
        Z`;
  }, [height, width, hasRoundedCorners]);

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

import React from 'react';
import {animated, useSpring} from '@react-spring/web';

import {
  HORIZONTAL_BAR_LABEL_HEIGHT,
  BARS_TRANSITION_CONFIG,
  FONT_SIZE,
} from '../../../constants';

interface LabelProps {
  barHeight: number;
  color: string;
  label: string;
  labelWidth: number;
  x: number;
  y: number;
  animationDelay?: number;
  isAnimated?: boolean;
}

export function Label({
  animationDelay,
  barHeight,
  color,
  isAnimated,
  label,
  labelWidth,
  x,
  y,
}: LabelProps) {
  const labelYOffset = (barHeight - HORIZONTAL_BAR_LABEL_HEIGHT) / 2;

  const spring = useSpring({
    from: {transform: 'scaleX(0) translateZ(0)', opacity: 0},
    to: {opacity: 1, transform: 'scaleX(1) translateZ(0)'},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g
      style={{
        opacity: spring.opacity,
        transform: spring.transform,
      }}
    >
      <foreignObject
        height={FONT_SIZE}
        width={labelWidth}
        aria-hidden="true"
        y={y + labelYOffset}
        x={x}
      >
        <div
          style={{
            fontSize: `${FONT_SIZE}px`,
            color,
            lineHeight: `${HORIZONTAL_BAR_LABEL_HEIGHT}px`,
            height: HORIZONTAL_BAR_LABEL_HEIGHT,
          }}
        >
          {label}
        </div>
      </foreignObject>
    </animated.g>
  );
}

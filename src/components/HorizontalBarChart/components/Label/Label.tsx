import React from 'react';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG, FONT_SIZE} from '../../../../constants';
import {BAR_LABEL_HEIGHT} from '../../constants';

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
  const labelYOffset = (barHeight - BAR_LABEL_HEIGHT) / 2;

  const spring = useSpring({
    from: {x: 0, opacity: 0},
    to: {opacity: 1, x},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.foreignObject
      height={FONT_SIZE}
      width={labelWidth}
      x={spring.x}
      y={y + labelYOffset}
      aria-hidden="true"
      opacity={spring.opacity}
    >
      <div
        style={{
          fontSize: `${FONT_SIZE}px`,
          color,
          lineHeight: `${BAR_LABEL_HEIGHT}px`,
          height: BAR_LABEL_HEIGHT,
        }}
      >
        {label}
      </div>
    </animated.foreignObject>
  );
}

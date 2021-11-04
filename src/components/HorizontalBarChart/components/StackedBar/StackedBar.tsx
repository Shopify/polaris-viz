import {animated, useSpring} from '@react-spring/web';
import React from 'react';

import {DataType} from '../../../../types';

interface StackedBarProps {
  color: string;
  groupIndex: number;
  height: number;
  isAnimated: boolean;
  seriesIndex: number;
  width: number;
  x: number;
}

export function StackedBar({
  color,
  groupIndex,
  height,
  isAnimated,
  seriesIndex,
  width,
  x,
}: StackedBarProps) {
  const {transform} = useSpring({
    from: {transform: `scale(0.5, 1)`},
    to: {transform: `scale(1, 1)`},
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g style={{transform}}>
      <rect
        data-index={groupIndex}
        data-type={DataType.Bar}
        fill={`url(#${color})`}
        height={height}
        key={seriesIndex}
        style={{outline: 'none', transformOrigin: `${x}px 0px`}}
        tabIndex={seriesIndex === 0 ? 0 : -1}
        width={width}
        x={x}
      />
    </animated.g>
  );
}

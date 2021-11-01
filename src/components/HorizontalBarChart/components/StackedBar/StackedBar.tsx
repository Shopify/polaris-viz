import {animated, useSpring} from '@react-spring/web';
import React from 'react';

import {DataType} from '../../../../types';

interface StackedBarProps {
  color: string;
  groupIndex: number;
  height: number;
  seriesIndex: number;
  width: number;
  x: number;
}

export function StackedBar({
  color,
  groupIndex,
  height,
  seriesIndex,
  width,
  x,
}: StackedBarProps) {
  const spring = useSpring({
    from: {width: width * 0.5, x: x * 0.5},
    to: {width, x},
  });

  return (
    <animated.rect
      data-index={groupIndex}
      data-type={DataType.Bar}
      fill={`url(#${color})`}
      height={height}
      key={seriesIndex}
      style={{outline: 'none', transformOrigin: `${x}px 0px`}}
      tabIndex={seriesIndex === 0 ? 0 : -1}
      width={spring.width}
      x={spring.x}
    />
  );
}

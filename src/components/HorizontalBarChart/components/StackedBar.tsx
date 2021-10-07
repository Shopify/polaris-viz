import {animated, useSpring} from '@react-spring/web';
import React from 'react';

import {DataType} from '../../../types';
import {GRADIENT_ID, SIZES} from '../constants';
import type {Size} from '../types';

interface StackedBarProps {
  groupIndex: number;
  seriesIndex: number;
  size: Size;
  width: number;
  x: number;
}

export function StackedBar({
  groupIndex,
  seriesIndex,
  size,
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
      fill={`url(#${GRADIENT_ID}${seriesIndex})`}
      height={SIZES[size]}
      key={seriesIndex}
      style={{outline: 'none', transformOrigin: `${x}px 0px`}}
      tabIndex={seriesIndex === 0 ? 0 : -1}
      width={spring.width}
      x={spring.x}
    />
  );
}

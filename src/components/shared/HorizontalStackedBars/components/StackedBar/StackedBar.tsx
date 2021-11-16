import {animated, useSpring} from '@react-spring/web';
import React from 'react';

import {getRoundedRectPath} from '../../../../../utilities';
import {DataType, RoundedBorder} from '../../../../../types';

interface StackedBarProps {
  color: string;
  groupIndex: number;
  height: number;
  isAnimated: boolean;
  seriesIndex: number;
  roundedBorder: RoundedBorder;
  width: number;
  x: number;
}

export function StackedBar({
  color,
  groupIndex,
  height,
  isAnimated,
  roundedBorder,
  seriesIndex,
  width,
  x,
}: StackedBarProps) {
  const {transform} = useSpring({
    from: {transform: `scale(0.5, 1)`},
    to: {transform: `scale(1, 1)`},
    default: {immediate: !isAnimated},
  });

  const pathD = getRoundedRectPath({
    height,
    width,
    needsMinWidth: false,
    roundedBorder,
  });

  return (
    <animated.g style={{transform}}>
      <path
        d={pathD}
        data-index={groupIndex}
        data-type={DataType.Bar}
        fill={`url(#${color})`}
        height={height}
        key={seriesIndex}
        style={{outline: 'none', transformOrigin: `${x}px 0px`}}
        tabIndex={seriesIndex === 0 ? 0 : -1}
        width={width}
        transform={`translate(${x},0)`}
      />
    </animated.g>
  );
}

import React from 'react';
import {arc, PieArcDatum} from 'd3-shape';
import {animated, SpringValue, SpringConfig} from '@react-spring/web';

import {PathInterpolator} from '../../../../types';

export interface Spring {
  endAngle: number;
  config: SpringConfig;
}

interface Props {
  innerRadius: number;
  outerRadius: number;
  slice: PieArcDatum<number | {valueOf(): number}>;
  endAngle?: SpringValue<number>;
  color: string;
  formattedValue: string;
  label: string;
}

export function Arc({
  innerRadius,
  outerRadius,
  slice,
  color,
  endAngle,
  formattedValue,
  label,
}: Props) {
  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const path = endAngle
    ? endAngle.to((value) =>
        arcGenerator({...slice, endAngle: value, innerRadius, outerRadius}),
      )
    : arcGenerator({...slice, innerRadius, outerRadius});

  console.log({path});

  return typeof path === 'string' ? (
    <animated.path
      d={path}
      fill={color}
      role="listitem"
      aria-label={formattedValue}
      aria-describedby={label}
    />
  ) : null;
}

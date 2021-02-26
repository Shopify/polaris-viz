import React from 'react';
import {arc, PieArcDatum} from 'd3-shape';
import {animated, AnimatedValue, SpringConfig} from 'react-spring';

export interface Spring {
  endAngle: number;
  config: SpringConfig;
}

interface Props {
  innerRadius: number;
  outerRadius: number;
  slice: PieArcDatum<number | {valueOf(): number}>;
  spring?: AnimatedValue<Pick<Spring, 'endAngle'>>;
  color: string;
  formattedValue: string;
  label: string;
}

export function Arc({
  innerRadius,
  outerRadius,
  slice,
  color,
  spring,
  formattedValue,
  label,
}: Props) {
  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const path = spring
    ? spring.endAngle.interpolate((value) =>
        arcGenerator({...slice, endAngle: value, innerRadius, outerRadius}),
      )
    : arcGenerator({...slice, innerRadius, outerRadius});

  return path != null ? (
    <animated.path
      d={path}
      fill={color}
      role="listitem"
      aria-label={formattedValue}
      aria-describedby={label}
    />
  ) : null;
}

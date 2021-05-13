import React from 'react';
import {arc, PieArcDatum} from 'd3-shape';
import {
  animated,
  SpringValue,
  SpringConfig,
  Interpolation,
} from '@react-spring/web';

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
  endAngle?.start();

  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const path = endAngle
    ? endAngle.to((value) =>
        arcGenerator({...slice, endAngle: value, innerRadius, outerRadius}),
      )
    : arcGenerator({...slice, innerRadius, outerRadius});

  const isInterpolation = (path: any): path is Interpolation => {
    return Object.prototype.hasOwnProperty.call(path, 'get');
  };

  return path ? (
    <animated.path
      d={isInterpolation(path) ? path.get() : path}
      fill={color}
      role="listitem"
      aria-label={formattedValue}
      aria-describedby={label}
    />
  ) : null;
}

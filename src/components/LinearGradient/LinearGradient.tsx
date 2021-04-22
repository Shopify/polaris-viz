import React from 'react';

import {GradientStop} from '../../types';

export interface LinearGradientProps {
  gradient: GradientStop[];
  id: string;
  x1?: string;
  x2?: string;
  y1?: string;
  y2?: string;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
}

export function LinearGradient({
  gradient,
  id,
  x1 = '0%',
  x2 = '0%',
  y1 = '100%',
  y2 = '0%',
  gradientUnits = 'objectBoundingBox',
}: LinearGradientProps) {
  return (
    <linearGradient
      id={id}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      gradientUnits={gradientUnits}
    >
      {gradient.map(({color, offset}) => (
        <stop
          key={`${id}-${color}-${offset}`}
          offset={`${offset}%`}
          stopColor={color}
        />
      ))}
    </linearGradient>
  );
}

import React from 'react';

import {Stop} from '../';
import type {GradientStop} from '../../types';
import {SvgNode} from '../SVG';

export interface LinearGradientProps {
  gradient: GradientStop[];
  id: string;
  x1?: string;
  x2?: string;
  y1?: string;
  y2?: string;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  native?: boolean;
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
    <SvgNode
      tagName="linearGradient"
      id={id}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      gradientUnits={gradientUnits}
    >
      {gradient.map(({color, offset, stopOpacity = 1}) => (
        <Stop
          key={`${id}-${color}-${offset}`}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity={stopOpacity}
        />
      ))}
    </SvgNode>
  );
}

import React, {createElement} from 'react';
import {
  LinearGradient as NativeGradient,
  Stop as NativeStop,
} from 'react-native-svg';

import type {GradientStop} from '../../types';

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

function Gradient({native, children, ...props}) {
  return createElement(
    native ? NativeGradient : 'linearGradient',
    props,
    children,
  );
}

function Stop({native, ...props}) {
  return createElement(native ? NativeStop : 'stop', props);
}

export function LinearGradient({
  gradient,
  id,
  x1 = '0%',
  x2 = '0%',
  y1 = '100%',
  y2 = '0%',
  gradientUnits = 'objectBoundingBox',
  native = false,
}: LinearGradientProps) {
  return (
    <Gradient
      native={native}
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
    </Gradient>
  );
}

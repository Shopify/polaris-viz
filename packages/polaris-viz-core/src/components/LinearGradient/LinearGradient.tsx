import React, {createElement, ReactNode} from 'react';
import {LinearGradient as NativeGradient} from 'react-native-svg';

import {Stop} from '../';
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

function Gradient({
  native,
  children,
  ...props
}: {
  native: boolean;
  children: ReactNode;
  [x: string]: any;
}) {
  return createElement(
    native ? NativeGradient : 'linearGradient',
    props,
    children,
  );
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
          native={native}
          key={`${id}-${color}-${offset}`}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity={stopOpacity}
        />
      ))}
    </Gradient>
  );
}

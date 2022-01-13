import React from 'react';
import {animated, useSpring} from '@react-spring/web';
import type {Area as D3Area, Line} from 'd3-shape';

import type {Color, GradientStop, Theme} from '../../../../types';
import {LINES_LOAD_ANIMATION_CONFIG} from '../../../../constants';
import {LinearGradient} from '../../../LinearGradient';
import {isGradientType} from '../../../../utilities';
import type {StackedSeries} from '../../types';

export interface AreaProps {
  animationIndex: number;
  areaGenerator: D3Area<number[]>;
  colors: Color[];
  data: StackedSeries;
  duration: number;
  id: string;
  index: number;
  isImmediate: boolean;
  lineGenerator: Line<number[]>;
  selectedTheme: Theme;
}

export function Area({
  animationIndex,
  areaGenerator,
  colors,
  data,
  duration,
  id,
  index,
  isImmediate,
  lineGenerator,
  selectedTheme,
}: AreaProps) {
  const delay = animationIndex * (duration / 2);

  const spring = useSpring({
    from: {transform: 'translateY(25%)', opacity: 0},
    to: {transform: 'translateY(0)', opacity: 1},
    delay,
    duration,
    config: LINES_LOAD_ANIMATION_CONFIG,
    immediate: isImmediate,
    reset: true,
  });

  const areaSpring = useSpring({
    from: {opacity: 0},
    to: {opacity: 0.25},
    delay: delay + duration,
    duration,
    config: LINES_LOAD_ANIMATION_CONFIG,
    immediate: isImmediate,
    reset: true,
  });

  const shape = areaGenerator(data);
  const line = lineGenerator(data);

  if (shape == null || line == null) {
    return null;
  }

  const currentColor = colors[index];
  const isGradient = isGradientType(currentColor);

  const gradient = isGradient
    ? currentColor
    : [{offset: 0, color: currentColor}];

  return (
    <animated.g style={{...spring, transformOrigin: 'bottom center'}}>
      <defs>
        <LinearGradient
          id={`area-${id}-${index}`}
          gradient={gradient as GradientStop[]}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />
      </defs>
      <path
        key={`line-${index}`}
        d={line}
        fill="none"
        stroke={`url(#area-${id}-${index})`}
        strokeWidth={selectedTheme.line.width}
      />
      <animated.path
        key={index}
        d={shape}
        fill={`url(#area-${id}-${index})`}
        style={areaSpring}
      />
    </animated.g>
  );
}

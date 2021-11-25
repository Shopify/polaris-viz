import React from 'react';

import {GRADIENT_ID} from '../../../constants';
import type {Color, GradientStop} from '../../../types';
import {isGradientType} from '../../../utilities';
import {LinearGradient} from '../../LinearGradient';

interface GradientDefsProps {
  seriesColors?: Color[];
  width: number;
  theme?: string;
}

export function GradientDefs({
  seriesColors = [],
  theme = 'Default',
  width,
}: GradientDefsProps) {
  return (
    <defs>
      {seriesColors.map((color, index) => {
        const id = getGradientDefId(theme, index);
        return <Gradient key={id} id={id} color={color} width={width} />;
      })}
    </defs>
  );
}

function Gradient({
  id,
  color,
  width,
}: {
  id: string;
  color: Color;
  width: number;
}) {
  const gradient: GradientStop[] = isGradientType(color)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];
  return (
    <LinearGradient
      gradient={gradient}
      gradientUnits="userSpaceOnUse"
      id={id}
      x2={`${width}px`}
      y1="0"
    />
  );
}

export function getGradientDefId(theme = 'Default', index: number) {
  return `${theme}-${GRADIENT_ID}-${index}`;
}

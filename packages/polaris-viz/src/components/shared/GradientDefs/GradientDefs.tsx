import React from 'react';

import type {Color, GradientStop} from '../../../types';
import {isGradientType} from '../../../utilities';
import {LinearGradient} from '../../../components';

const GRADIENT_ID = 'grad';

interface GradientDefsProps {
  width: number;
  id: string;
  seriesColors?: Color[];
  theme?: string;
}

export function GradientDefs({
  id,
  seriesColors = [],
  theme = 'Default',
  width,
}: GradientDefsProps) {
  return (
    <defs>
      {seriesColors.map((color, index) => {
        const gradId = getGradientDefId(theme, index, id);
        return (
          <Gradient key={gradId} id={gradId} color={color} width={width} />
        );
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

export function getGradientDefId(theme = 'Default', index: number, id: string) {
  return [id, theme, index, GRADIENT_ID].join('-');
}

import React from 'react';

import type {Color, GradientStop, GradientUnits} from '../../../types';
import {isGradientType} from '../../../utilities';
import {LinearGradient} from '../../LinearGradient';

const GRADIENT_ID = 'grad';

interface GradientDefsProps {
  width: string;
  id: string;
  seriesColors?: Color[];
  theme?: string;
  gradientUnits?: GradientUnits;
}

export function GradientDefs({
  id,
  seriesColors = [],
  theme = 'Default',
  width = '100%',
  gradientUnits,
}: GradientDefsProps) {
  return (
    <defs>
      {seriesColors.map((color, index) => {
        const gradId = getGradientDefId(theme, index, id);
        return (
          <Gradient
            key={gradId}
            id={gradId}
            color={color}
            width={width}
            gradientUnits={gradientUnits}
          />
        );
      })}
    </defs>
  );
}

function Gradient({
  id,
  color,
  width,
  gradientUnits = 'userSpaceOnUse',
}: {
  id: string;
  color: Color;
  width: string;
  gradientUnits?: GradientUnits;
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
      gradientUnits={gradientUnits}
      id={id}
      x2={width}
      y1="0"
    />
  );
}

export function getGradientDefId(theme = 'Default', index: number, id: string) {
  return [id, theme, index, GRADIENT_ID].join('-');
}

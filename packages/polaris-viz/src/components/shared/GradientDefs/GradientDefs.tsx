import React from 'react';
import {LinearGradientWithStops} from '@shopify/polaris-viz-core';

import type {
  Color,
  Direction,
  GradientStop,
  GradientUnits,
} from '../../../types';
import {isGradientType} from '../../../utilities';

const GRADIENT_ID = 'grad';

interface GradientDefsProps {
  size: string;
  id: string;
  direction?: Direction;
  seriesColors?: Color[];
  theme?: string;
  gradientUnits?: GradientUnits;
}

export function GradientDefs({
  direction = 'vertical',
  id,
  seriesColors = [],
  theme = 'Default',
  size = '100%',
  gradientUnits,
}: GradientDefsProps) {
  return (
    <defs>
      {seriesColors.map((color, index) => {
        const gradId = getGradientDefId(theme, index, id);
        return (
          <Gradient
            color={color}
            direction={direction}
            gradientUnits={gradientUnits}
            id={gradId}
            key={gradId}
            size={size}
          />
        );
      })}
    </defs>
  );
}

function Gradient({
  id,
  color,
  direction,
  size,
  gradientUnits = 'userSpaceOnUse',
}: {
  id: string;
  color: Color;
  direction: Direction;
  size: string;
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

  const position = direction === 'vertical' ? {y1: size} : {x2: size};

  return (
    <LinearGradientWithStops
      gradient={gradient}
      gradientUnits={gradientUnits}
      id={id}
      {...position}
    />
  );
}

export function getGradientDefId(theme = 'Default', index: number, id: string) {
  return [id, theme, index, GRADIENT_ID].join('-');
}

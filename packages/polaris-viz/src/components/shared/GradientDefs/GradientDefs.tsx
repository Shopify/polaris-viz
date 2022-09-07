import React from 'react';
import {
  LinearGradientWithStops,
  useChartContext,
  getGradientFromColor,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import type {GradientUnits} from '../../../types';

const GRADIENT_ID = 'grad';

interface GradientDefsProps {
  size: string;
  id: string;
  direction?: Direction;
  seriesColors?: Color[];
  gradientUnits?: GradientUnits;
}

export function GradientDefs({
  direction = 'vertical',
  id,
  seriesColors = [],
  size = '100%',
  gradientUnits,
}: GradientDefsProps) {
  const {theme} = useChartContext();

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
  const gradient = getGradientFromColor(color);
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

import React from 'react';

import type {Color, GradientStop} from '../../../../types';
import {isGradientType} from '../../../../utilities';
import {LinearGradient} from '../../../LinearGradient';
import {GRADIENT_ID} from '../../constants';
import type {ColorOverrides} from '../../types';

interface GradientDefsProps {
  width: number;
  colorOverrides?: ColorOverrides[];
  seriesColors?: Color[];
  theme?: string;
}

export function GradientDefs({
  colorOverrides = [],
  seriesColors = [],
  theme = 'Default',
  width,
}: GradientDefsProps) {
  return (
    <defs>
      {colorOverrides.map(({id, color}) => {
        return <Gradient key={id} id={id} color={color} width={width} />;
      })}
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

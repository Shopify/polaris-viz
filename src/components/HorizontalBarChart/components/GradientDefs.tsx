import React from 'react';

import type {Color, GradientStop} from '../../../types';
import {isGradientType} from '../../../utilities';
import {LinearGradient} from '../../LinearGradient';
import {GRADIENT_ID} from '../constants';
import type {ColorOverrides} from '../types';

interface GradientDefsProps {
  colorOverrides: ColorOverrides[];
  seriesColors: Color[];
}

export function GradientDefs({
  colorOverrides,
  seriesColors,
}: GradientDefsProps) {
  return (
    <defs>
      {colorOverrides.map(({id, color}) => {
        return <Gradient key={id} id={id} color={color} />;
      })}
      {seriesColors.map((color, index) => {
        const id = `${GRADIENT_ID}${index}`;
        return <Gradient key={id} id={id} color={color} />;
      })}
    </defs>
  );
}

function Gradient({id, color}: {id: string; color: Color}) {
  const gradient: GradientStop[] = isGradientType(color)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];
  return <LinearGradient gradient={gradient} id={id} x2="100%" y1="0%" />;
}

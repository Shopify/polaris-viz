import React from 'react';

import {NEGATIVE_SINGLE_GRADIENT} from '../../../constants';
import type {Color, GradientStop} from '../../../types';
import {isGradientType} from '../../../utilities';
import {LinearGradient} from '../../LinearGradient';
import {GRADIENT_ID, NEGATIVE_GRADIENT_ID} from '../constants';

interface GradientDefsProps {
  seriesColors: Color[];
}

export function GradientDefs({seriesColors}: GradientDefsProps) {
  return (
    <defs>
      {seriesColors.map((color, index) => {
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
            id={`${GRADIENT_ID}${index}`}
            key={`${GRADIENT_ID}${index}`}
            x2="100%"
            y1="0%"
          />
        );
      })}
      <LinearGradient
        gradient={NEGATIVE_SINGLE_GRADIENT}
        id={NEGATIVE_GRADIENT_ID}
        x2="100%"
        y1="0%"
      />
    </defs>
  );
}

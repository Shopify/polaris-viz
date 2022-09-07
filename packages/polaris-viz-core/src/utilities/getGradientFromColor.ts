import type {Color, GradientStop} from '../types';

import {isGradientType} from './isGradientType';

export function getGradientFromColor(color: Color): GradientStop[] {
  return isGradientType(color)
    ? color
    : [
        {color, offset: 0},
        {color, offset: 1},
      ];
}

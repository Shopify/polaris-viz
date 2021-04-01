import {Color, GradientColor} from 'types';

import {isGradientType, gradientColors, getColorValue} from './get-color-value';

export enum GradientPosition {
  Start = 'start',
  End = 'end',
}

export function getGradientStops(
  color: Color | GradientColor,
  position: GradientPosition,
) {
  return isGradientType(color)
    ? gradientColors[color][position]
    : getColorValue(color);
}

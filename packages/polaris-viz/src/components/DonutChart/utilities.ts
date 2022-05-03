import type {DonutChartColors} from './types';
import {GRADIENT_COLORS} from './constants';

function isDonutColorType(color: DonutChartColors): color is DonutChartColors {
  if (typeof color !== 'string') return false;

  return color in GRADIENT_COLORS;
}

export function getColorGradient(color: DonutChartColors) {
  if (isDonutColorType(color)) {
    return GRADIENT_COLORS[color];
  } else {
    throw new Error(`${color} is not a valid color`);
  }
}

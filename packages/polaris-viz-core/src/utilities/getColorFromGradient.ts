/* eslint-disable id-length */
import type {GradientStop} from '../types';

import {hexToRGB} from './hexToRGB';

export function getColorFromGradient(
  gradient: GradientStop[],
  percent: number,
) {
  const firstColor = hexToRGB(gradient[0].color);
  const lastColor = hexToRGB(gradient[gradient.length - 1].color);

  const remainingPercent = 1 - percent;

  const r = Math.round(lastColor.r * percent + firstColor.r * remainingPercent);
  const g = Math.round(lastColor.g * percent + firstColor.g * remainingPercent);
  const b = Math.round(lastColor.b * percent + firstColor.b * remainingPercent);

  return `rgb(${r},${g},${b})`;
}

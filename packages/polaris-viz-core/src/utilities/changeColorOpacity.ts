import {color} from 'd3-color';

import type {GradientStop} from '../types';

export function changeColorOpacity(colorString: string, opacity = 1): string {
  const rgbColor = color(colorString);

  if (rgbColor == null) {
    throw new Error('Color value is not valid.');
  }

  rgbColor.opacity = opacity;

  return rgbColor.toString();
}

export function changeGradientOpacity(gradient: GradientStop[], opacity = 1) {
  return gradient.map(({offset, color}) => ({
    offset,
    color: changeColorOpacity(color, opacity),
  }));
}

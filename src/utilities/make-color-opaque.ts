import {color as d3Color} from 'd3-color';

import {GradientStop} from '../types';

export function makeColorOpaque(color: string): string {
  const rgbColor = d3Color(color);

  if (rgbColor == null) {
    throw new Error('Color value is not valid.');
  }

  rgbColor.opacity = 1;

  return rgbColor.toString();
}

export function makeGradientOpaque(gradient: GradientStop[]) {
  return gradient.map(({offset, color}) => ({
    offset,
    color: makeColorOpaque(color),
  }));
}

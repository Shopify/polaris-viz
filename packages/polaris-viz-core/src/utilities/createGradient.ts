import {scaleLinear} from 'd3-scale';

import type {GradientStop} from '../types';

export const createGradient = (...colors: string[]): GradientStop[] => {
  colors.reverse();

  const scale = scaleLinear()
    .domain([0, colors.length - 1])
    .range([0, 100]);
  return colors.map((color, index) => ({
    offset: scale(index),
    color,
  }));
};

import type {GradientStop} from 'types';
import {scaleLinear} from 'd3-scale';

export const createGradient = (...colors: string[]): GradientStop[] => {
  const scale = scaleLinear().domain([0, 100]).range([0, colors.length]);
  return colors.map((color, index) => ({
    offset: scale(index),
    color,
  }));
};

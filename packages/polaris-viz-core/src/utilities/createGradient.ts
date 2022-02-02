import type {GradientStop} from 'types';

export const createGradient = (
  color1: string,
  color2: string,
): GradientStop[] => {
  return [
    {offset: 0, color: color2},
    {offset: 100, color: color1},
  ];
};

import {GradientStop} from 'types';

export const createCSSGradient = (gradient: GradientStop[]) => {
  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}%`,
  );

  return `linear-gradient(0deg, ${gradientStops.join(',')})`;
};

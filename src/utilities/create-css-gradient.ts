import {GradientStop} from 'types';

export const createCSSGradient = (gradient: GradientStop[]) => {
  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}%`,
  );

  return `linear-gradient(305deg, ${gradientStops.join(',')})`;
};

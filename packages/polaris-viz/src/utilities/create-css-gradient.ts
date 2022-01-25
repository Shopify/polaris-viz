import type {GradientStop} from '../types';

export const createCSSGradient = (gradient: GradientStop[], angle: number) => {
  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}%`,
  );

  return `linear-gradient(${angle}deg, ${gradientStops.join(',')})`;
};

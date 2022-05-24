import type {GradientStop} from '@shopify/polaris-viz-core';

export function createCSSConicGradient(gradient: GradientStop[]) {
  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}deg`,
  );

  return `conic-gradient(${gradientStops.join(',')})`;
}

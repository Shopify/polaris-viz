import type {GradientStop} from '@shopify/polaris-viz-core';

export function createCSSConicGradient(gradient: GradientStop[]) {
  if (gradient.length === 1) {
    const color = gradient[0].color;
    return `conic-gradient(${color} 0%, ${color} 100%)`;
  }

  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}%`,
  );

  return `conic-gradient(${gradientStops.join(', ')})`;
}

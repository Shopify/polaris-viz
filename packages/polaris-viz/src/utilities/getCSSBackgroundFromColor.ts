import {Color, isGradientType} from '@shopify/polaris-viz-core';

import {createCSSGradient} from './createCssGradient';

export function getCSSBackgroundFromColor(color: Color, angle = 90): string {
  return isGradientType(color) ? createCSSGradient(color, angle) : color;
}

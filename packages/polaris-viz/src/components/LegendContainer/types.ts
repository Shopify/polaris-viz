import type {Color, Shape} from '@shopify/polaris-viz-core';

export interface LegendData {
  name: string;
  color: Color;
  isComparison?: boolean;
  shape?: Shape;
}

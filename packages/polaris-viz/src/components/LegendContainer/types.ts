import type {Color} from '@shopify/polaris-viz-core';

export type LegendIconType = 'solid' | 'line';

export interface LegendData {
  name: string;
  color: Color;
  isComparison?: boolean;
  iconType?: LegendIconType;
}

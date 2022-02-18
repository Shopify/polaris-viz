import type {Color} from '@shopify/polaris-viz-core';

export interface RenderTooltipContentData {
  title: string;
  data: {
    color: Color;
    label: string;
    value: number;
  }[];
}

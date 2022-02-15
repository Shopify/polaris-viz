import type {Color, DataSeries, LineStyle} from '@shopify/polaris-viz-core';

export type DataWithDefaults = DataSeries & {
  color: Color;
  lineStyle: LineStyle;
  areaColor?: string | null;
};

export interface TooltipData {
  name: string;
  point: {
    label: string;
    value: number;
  };
  color: Color;
  lineStyle: LineStyle;
}

export interface RenderTooltipContentData {
  data: TooltipData[];
}

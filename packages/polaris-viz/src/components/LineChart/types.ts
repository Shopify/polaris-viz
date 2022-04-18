import type {Color, DataSeries, LineStyle} from '@shopify/polaris-viz-core';

export type DataWithDefaults = DataSeries & {
  color: Color;
  lineStyle: LineStyle;
  areaColor?: string | null;
};

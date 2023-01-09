import type {DataSeries, Shape} from '@shopify/polaris-viz-core';

export interface MetaData {
  relatedIndex?: number;
  areaColor?: string;
  shape?: Shape;
}

export interface LineChartRelationalDataSeries extends DataSeries {
  metadata?: MetaData;
}

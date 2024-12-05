import type {DataSeries} from '@shopify/polaris-viz-core';

import type {LineChartProps} from '../LineChart/LineChart';

export interface MetaData {
  isPredictive?: boolean;
  relatedIndex?: number;
  startKey?: string;
}

export interface LineChartPredictiveDataSeries extends DataSeries {
  metadata?: MetaData;
}

export interface LineChartPredictiveProps
  extends Omit<LineChartProps, 'data' | 'renderLegendContent'> {
  data: LineChartPredictiveDataSeries[];
}

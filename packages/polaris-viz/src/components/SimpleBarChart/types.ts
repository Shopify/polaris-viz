import type {DataSeries} from '@shopify/polaris-viz-core';

import type {TrendIndicatorProps} from '../TrendIndicator';

export type MetaDataTrendIndicator = Omit<TrendIndicatorProps, 'theme'>;

export interface MetaData {
  trends?: {[key: number]: MetaDataTrendIndicator};
}

export interface SimpleBarChartDataSeries extends DataSeries {
  metadata?: MetaData;
}

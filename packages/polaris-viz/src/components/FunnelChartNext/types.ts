import type {DataSeries} from '@shopify/polaris-viz-core';

import type {TrendIndicatorProps} from '../TrendIndicator';

export type MetaDataTrendIndicator = Omit<TrendIndicatorProps, 'theme'>;

export interface FunnelChartMetaData {
  trends?: MetaDataTrendIndicator;
}

export type FunnelChartDataSeries = DataSeries & {
  metadata?: FunnelChartMetaData;
};

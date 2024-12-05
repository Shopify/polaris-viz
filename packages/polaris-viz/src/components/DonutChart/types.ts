import type {DataSeries} from '@shopify/polaris-viz-core/src/types';

import type {TrendIndicatorProps} from '../TrendIndicator/TrendIndicator';

export type MetaDataTrendIndicator = Omit<TrendIndicatorProps, 'theme'>;

export interface MetaData {
  trend?: MetaDataTrendIndicator;
}

export interface DonutChartDataSeries extends DataSeries {
  metadata?: MetaData;
}

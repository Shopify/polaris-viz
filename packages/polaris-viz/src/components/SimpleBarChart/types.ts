import type {DataSeries} from '@shopify/polaris-viz-core';
import type {MetaData} from 'components/TrendIndicator/types';

export interface SimpleBarChartDataSeries extends DataSeries {
  metadata?: MetaData;
}

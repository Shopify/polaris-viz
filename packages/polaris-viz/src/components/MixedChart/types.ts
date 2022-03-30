import type {DataSeries} from '@shopify/polaris-viz-core';
import type {LabelFormatter} from 'types';

export interface MixedChartDataSeries {
  shape: 'Line' | 'Bar';
  series: DataSeries[];
  yAxisOptions?: {
    labelFormatter?: LabelFormatter;
    intergersOnly?: boolean;
  };
}

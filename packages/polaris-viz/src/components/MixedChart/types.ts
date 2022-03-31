import type {DataSeries} from '@shopify/polaris-viz-core';
import type {YAxisOptions} from 'types';

type Shape = 'Line' | 'Bar';

export interface MixedChartDataSeries {
  shape: Shape;
  series: DataSeries[];
  yAxisOptions?: Partial<YAxisOptions>;
}

export interface Axis {
  areAllValuesNegative: boolean;
  areSomeValuesNegative: boolean;
  index: number;
  max: number;
  min: number;
  shape: Shape;
}

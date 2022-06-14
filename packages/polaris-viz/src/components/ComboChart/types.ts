import type {DataSeries, YAxisOptions} from '@shopify/polaris-viz-core';

type Shape = 'Line' | 'Bar';

export interface ComboChartDataSeries {
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
  yAxisOptions: Required<YAxisOptions>;
}

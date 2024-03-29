import type {Shape, YAxisOptions} from '@shopify/polaris-viz-core';

export enum AxisValueRange {
  'AllNegative',
  'SomeNegative',
  'AllPositive',
}

export interface Axis {
  valuesRange: AxisValueRange;
  index: number;
  max: number;
  min: number;
  shape: Shape;
  yAxisOptions: Required<YAxisOptions>;
  name?: string;
}

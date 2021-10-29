import type {ComparisonMetricShape} from '../ComparisonMetric';

export type Orientation = 'horizontal' | 'vertical';

export type Size = 'small' | 'medium' | 'large';

export type LabelPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface Data {
  formattedValue: string;
  value: number;
  label: string;
  comparisonMetric?: ComparisonMetricShape;
}

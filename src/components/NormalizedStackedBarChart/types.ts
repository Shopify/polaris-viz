export type Orientation = 'horizontal' | 'vertical';

export type Size = 'small' | 'medium' | 'large';

export interface Data {
  formattedValue: string;
  value: number;
  label: string;
  comparisonMetric?: {metric: string; trend: 'positive' | 'negative'};
}

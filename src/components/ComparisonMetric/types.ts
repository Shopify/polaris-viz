export interface ComparisonMetricShape {
  metric: string;
  trend: 'positive' | 'negative' | 'neutral';
  accessibilityLabel: string;
}

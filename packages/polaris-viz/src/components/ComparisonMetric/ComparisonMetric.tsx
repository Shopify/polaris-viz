import type {Trend} from '@shopify/polaris-viz-core';

import {TrendIndicator} from '../TrendIndicator';

export interface ComparisonMetricProps {
  metric?: string;
  trend: Trend;
  accessibilityLabel: string;
  dataIndex?: number;
}

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
}: Omit<ComparisonMetricProps, 'dataIndex'>) {
  let direction;
  switch (trend) {
    case 'positive':
      direction = 'upward';
      break;
    case 'negative':
      direction = 'downward';
      break;
    case 'neutral':
    default:
      direction = undefined;
      break;
  }

  return (
    <TrendIndicator
      trend={trend}
      accessibilityLabel={accessibilityLabel}
      direction={direction}
      value={metric}
    />
  );
}

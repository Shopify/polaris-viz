import React from 'react';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

export interface ComparisonMetricProps {
  metric: {
    metric: string;
    trend: 'positive' | 'negative';
    accessibilityLabel: string;
  };
}

export function ComparisonMetric({metric}: ComparisonMetricProps) {
  const positiveIndicator = (
    <span className={styles.PositiveComparison}>
      <UpChevron />
      <span aria-label={metric.accessibilityLabel}>{metric.metric}</span>
    </span>
  );

  const negativeIndicator = (
    <span className={styles.NegativeComparison}>
      <DownChevron />
      <span aria-label={metric.accessibilityLabel}>{metric.metric}</span>
    </span>
  );

  const indicator =
    metric.trend === 'negative' ? negativeIndicator : positiveIndicator;

  return indicator;
}

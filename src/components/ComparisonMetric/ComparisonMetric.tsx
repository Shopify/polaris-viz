import React from 'react';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

export interface ComparisonMetricProps {
  metric: {
    metric: string;
    trend: 'positive' | 'negative' | 'neutral';
    accessibilityLabel: string;
  };
}

export function ComparisonMetric({metric}: ComparisonMetricProps) {
  if (metric.trend === 'neutral') {
    const label = `${metric.accessibilityLabel} ${metric.metric}`;
    return (
      <span className={styles.NeutralComparison}>
        <span aria-label={label}>{metric.metric}</span>
      </span>
    );
  }

  const positiveIndicator = (
    <span className={styles.PositiveComparison}>
      <UpChevron accessibilityLabel={metric.accessibilityLabel} />
      <span>{metric.metric}</span>
    </span>
  );

  const negativeIndicator = (
    <span className={styles.NegativeComparison}>
      <DownChevron accessibilityLabel={metric.accessibilityLabel} />
      <span>{metric.metric}</span>
    </span>
  );

  const indicator =
    metric.trend === 'negative' ? negativeIndicator : positiveIndicator;

  return indicator;
}

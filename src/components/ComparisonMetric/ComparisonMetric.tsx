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
  switch (metric.trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon}>
          <span aria-label={metric.accessibilityLabel}>{metric.metric}</span>
        </span>
      );
      break;
    case 'positive':
      return (
        <span className={styles.PositiveIcon}>
          <UpChevron accessibilityLabel={metric.accessibilityLabel} />
          <span>{metric.metric}</span>
        </span>
      );
      break;
    case 'negative':
      return (
        <span className={styles.NegativeIcon}>
          <DownChevron accessibilityLabel={metric.accessibilityLabel} />
          <span>{metric.metric}</span>
        </span>
      );
  }
}

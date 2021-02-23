import React from 'react';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

interface ComparisonMetricProps {
  metric: {metric: string; trend: 'positive' | 'negative'};
}

export function ComparisonMetric({metric}: ComparisonMetricProps) {
  let comparisonIndicator = (
    <span className={styles.PositiveComparison}>
      <UpChevron /> {metric.metric}
    </span>
  );

  if (metric.trend === 'negative') {
    comparisonIndicator = (
      <span className={styles.NegativeComparison}>
        <DownChevron /> {metric.metric}
      </span>
    );
  }

  return comparisonIndicator;
}

import React from 'react';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';
import {ComparisonMetricShape} from './types';

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
}: ComparisonMetricShape) {
  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span>-</span>
        </span>
      );
      break;
    case 'positive':
      return (
        <span className={styles.PositiveIcon}>
          <UpChevron accessibilityLabel={accessibilityLabel} />
          <span>{metric}</span>
        </span>
      );
      break;
    case 'negative':
      return (
        <span className={styles.NegativeIcon}>
          <DownChevron accessibilityLabel={accessibilityLabel} />
          <span>{metric}</span>
        </span>
      );
  }
}

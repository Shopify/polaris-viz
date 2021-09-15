import React from 'react';

import type {Legend} from 'types';

import styles from 'components/ComparisonMetric/ComparisonMetric.scss';
import {UpChevron, DownChevron} from 'components/ComparisonMetric/components';
import type {ComparisonMetricShape} from 'components/ComparisonMetric/types';

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
  theme,
}: ComparisonMetricShape & {theme: Legend}) {
  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span style={{color: theme.trendIndicator.neutral}}>-</span>
        </span>
      );
      break;
    case 'positive':
      return (
        <span className={styles.PositiveIcon}>
          <UpChevron
            accessibilityLabel={accessibilityLabel}
            fill={theme.trendIndicator.positive}
          />
          <span style={{color: theme.trendIndicator.positive}}>{metric}</span>
        </span>
      );
      break;
    case 'negative':
      return (
        <span className={styles.NegativeIcon}>
          <DownChevron
            accessibilityLabel={accessibilityLabel}
            fill={theme.trendIndicator.negative}
          />
          <span style={{color: theme.trendIndicator.negative}}>{metric}</span>
        </span>
      );
  }
}

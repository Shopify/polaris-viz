import React from 'react';
import type {Legend} from '@shopify/polaris-viz-core';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

export interface ComparisonMetricProps {
  metric: string;
  trend: 'positive' | 'negative' | 'neutral';
  accessibilityLabel: string;
  theme: Legend;
  dataIndex?: number;
}

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
  theme,
}: Omit<ComparisonMetricProps, 'dataIndex'>) {
  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span style={{color: theme.trendIndicator.neutral}}>-</span>
        </span>
      );
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

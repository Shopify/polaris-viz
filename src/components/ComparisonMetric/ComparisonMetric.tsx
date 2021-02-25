import React from 'react';

import {getColorValue} from '../../utilities';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';

export interface ComparisonMetricProps {
  metric: string;
  trend: 'positive' | 'negative' | 'neutral';
  accessibilityLabel: string;
}

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
}: ComparisonMetricProps) {
  const colorKey = trend === 'neutral' ? 'pastComparison' : trend;
  const color = getColorValue(colorKey);

  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon} style={{color}}>
          <span aria-label={accessibilityLabel}>{metric}</span>
        </span>
      );
      break;
    case 'positive':
      return (
        <span className={styles.PositiveIcon} style={{color}}>
          <UpChevron accessibilityLabel={accessibilityLabel} />
          <span>{metric}</span>
        </span>
      );
      break;
    case 'negative':
      return (
        <span className={styles.NegativeIcon} style={{color}}>
          <DownChevron accessibilityLabel={accessibilityLabel} />
          <span>{metric}</span>
        </span>
      );
  }
}

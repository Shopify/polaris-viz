import React from 'react';

import {getColorValue} from '../../utilities';

import styles from './ComparisonMetric.scss';
import {UpChevron, DownChevron} from './components';
import {ComparisonMetricShape} from './types';

export function ComparisonMetric({
  metric,
  trend,
  accessibilityLabel,
}: ComparisonMetricShape) {
  const colorKey = trend === 'neutral' ? 'pastComparison' : trend;
  const color = getColorValue(colorKey);

  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon} style={{color}}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span>{metric}</span>
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

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
  const neutralColor = getColorValue('colorInkLightest');

  switch (trend) {
    case 'neutral':
      return (
        <span className={styles.NeutralIcon} style={{color: neutralColor}}>
          <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
          <span>{metric}</span>
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

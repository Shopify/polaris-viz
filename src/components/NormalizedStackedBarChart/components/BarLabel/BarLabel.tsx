import React from 'react';

import {
  ComparisonMetric,
  ComparisonMetricShape,
} from '../../../ComparisonMetric';

import styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: string;
  comparisonMetric?: ComparisonMetricShape;
}

export function BarLabel({label, value, color, comparisonMetric}: Props) {
  const comparisonIndicator = comparisonMetric ? (
    <ComparisonMetric {...comparisonMetric} />
  ) : null;

  return (
    <li className={styles.Container}>
      <div style={{background: color}} className={styles.LabelColor} />
      <div className={styles.Label}>
        <strong>{label}</strong>
        <div className={styles.Value}>
          {value}
          {comparisonIndicator}
        </div>
      </div>
    </li>
  );
}

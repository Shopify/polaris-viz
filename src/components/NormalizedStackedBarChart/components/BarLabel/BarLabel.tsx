import React from 'react';

import styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: string;
  comparisonMetric?: number;
}

const upChevron = (
  <svg width="9" height="7" viewBox="0 0 9 7">
    <path d="M3.70759 1.02937C4.1079 0.509358 4.8921 0.509358 5.29241 1.02937L8.45678 5.14001C8.96297 5.79757 8.49421 6.75 7.66437 6.75L1.33563 6.75C0.505789 6.75 0.0370249 5.79757 0.543222 5.14001L3.70759 1.02937Z" />
  </svg>
);

const downChevron = (
  <svg width="10" height="7" viewBox="0 0 10 6">
    <path d="M5.79241 5.97063C5.3921 6.49064 4.6079 6.49064 4.20759 5.97063L1.04322 1.85999C0.537026 1.20243 1.00579 0.249999 1.83563 0.249999L8.16437 0.25C8.99421 0.25 9.46298 1.20242 8.95678 1.85999L5.79241 5.97063Z" />
  </svg>
);

export function BarLabel({label, value, color, comparisonMetric}: Props) {
  let comparisonIndicator = null;

  if (comparisonMetric !== null && comparisonMetric !== undefined) {
    if (comparisonMetric > 0) {
      comparisonIndicator = (
        <span className={styles.PositiveComparison}>
          {upChevron} {comparisonMetric}%
        </span>
      );
    } else {
      comparisonIndicator = (
        <span className={styles.NegativeComparison}>
          {downChevron} {Math.abs(comparisonMetric)}%
        </span>
      );
    }
  }

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

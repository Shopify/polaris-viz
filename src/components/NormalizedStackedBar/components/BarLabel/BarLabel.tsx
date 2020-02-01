import React from 'react';

import styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: string;
}

export function BarLabel({label, value, color}: Props) {
  return (
    <div className={styles.Container}>
      <div style={{background: color}} className={styles.LabelColor} />
      <div className={styles.Label}>
        <strong>{label}</strong>
        <div className={styles.Value}>{value}</div>
      </div>
    </div>
  );
}

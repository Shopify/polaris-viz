import React from 'react';
import {classNames} from '@shopify/css-utilities';
import * as styles from './BarLabel.scss';

export interface Props {
  label: string;
  value: string;
  color: string;
}

export function BarLabel({label, value, color}: Props) {
  return (
    <div className={styles.BarLabelContainer}>
      <div
        className={classNames(styles.BarLabelColor)}
        style={{background: color}}
      />
      <div className={styles.BarLabel}>
        <strong>{label}</strong>
        <p>{value}</p>
      </div>
    </div>
  );
}

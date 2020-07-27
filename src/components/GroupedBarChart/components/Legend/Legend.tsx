import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Data} from 'components/GroupedBarChart/types';

import styles from './Legend.scss';

interface Props {
  series: Data[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({label, color}) => (
        <div key={label} className={styles.InnerContainer}>
          <div
            className={styles.ColorPreview}
            style={{background: tokens[color]}}
          />
          <div className={styles.Label}>{label}</div>
        </div>
      ))}
    </div>
  );
}

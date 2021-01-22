import React from 'react';
import type {Data} from 'components/MultiSeriesBarChart/types';

import {SquareColorPreview} from '../../../SquareColorPreview';

import styles from './Legend.scss';

interface Props {
  series: Data[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({label, color}) => (
        <div key={label} className={styles.InnerContainer}>
          <SquareColorPreview color={color} />
          <div className={styles.Label}>{label}</div>
        </div>
      ))}
    </div>
  );
}

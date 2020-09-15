import React from 'react';
import {SquareColorPreview} from 'components';

import {Series} from '../../types';

import styles from './Legend.scss';

interface Props {
  series: Series[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({label, color}) => {
        return (
          <div className={styles.Series} key={label}>
            <SquareColorPreview color={color} />
            <p className={styles.SeriesName}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}

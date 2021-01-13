import React from 'react';

import {SquareColorPreview} from '../../../SquareColorPreview';
import {Series} from '../../types';

import styles from './Legend.scss';

interface Props {
  series: Required<Series>[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({name, color}) => {
        return (
          <div className={styles.Series} key={name}>
            <SquareColorPreview color={color} />
            <p className={styles.SeriesName}>{name}</p>
          </div>
        );
      })}
    </div>
  );
}

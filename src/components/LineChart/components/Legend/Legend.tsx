import React from 'react';

import {Series} from '../../types';
import {LinePreview} from '../LinePreview';

import styles from './Legend.scss';

interface Props {
  series: Required<Series>[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container} aria-hidden>
      {series.map(({name, color, lineStyle}, index) => {
        return (
          <div className={styles.Series} key={`${name}-${index}`}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.SeriesName}>{name}</p>
          </div>
        );
      })}
    </div>
  );
}

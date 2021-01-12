import React from 'react';
import {Series} from 'components/MultiSeriesBarChart/types';

import {SquareColorPreview} from '../../../SquareColorPreview';

import styles from './Legend.scss';

interface Props {
  series: Series[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({name, color}) => (
        <div key={name} className={styles.InnerContainer}>
          <SquareColorPreview color={color} />
          <div className={styles.Name}>{name}</div>
        </div>
      ))}
    </div>
  );
}

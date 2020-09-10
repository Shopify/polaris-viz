import React from 'react';
import {Series} from 'components/AreaChart/types';
import {SquareColorPreview} from 'components';

import styles from './Legend.scss';

interface Props {
  series: Series[];
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

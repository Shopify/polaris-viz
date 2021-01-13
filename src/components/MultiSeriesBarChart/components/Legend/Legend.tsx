import React from 'react';
import {Series} from 'components/MultiSeriesBarChart/types';

import {SquareColorPreview} from '../../../SquareColorPreview';

import styles from './Legend.scss';

type LegendSeries = Required<Omit<Series, 'highlightColor'>>;

interface Props {
  series: LegendSeries[];
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

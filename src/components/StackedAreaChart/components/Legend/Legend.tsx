import React from 'react';

import {SquareColorPreview} from '../../../SquareColorPreview';
import {Series} from '../../types';

import styles from './Legend.scss';

interface Props {
  series: Required<Series>[];
  ariaHidden?: boolean;
}

export function Legend({series, ariaHidden = false}: Props) {
  return (
    <div className={styles.Container} aria-hidden={ariaHidden}>
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

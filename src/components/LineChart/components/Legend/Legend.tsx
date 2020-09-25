import React from 'react';
import {Series} from 'components/LineChart/types';

import {LinePreview} from '../LinePreview';

import styles from './Legend.scss';

interface Props {
  series: Series[];
}

export function Legend({series}: Props) {
  return (
    <div className={styles.Container}>
      {series.map(({name, style = {}}) => {
        const {color = 'colorPurple', lineStyle = 'solid'} = style;

        return (
          <div className={styles.Series} key={name}>
            <LinePreview color={color} lineStyle={lineStyle} />
            <p className={styles.SeriesName}>{name}</p>
          </div>
        );
      })}
    </div>
  );
}

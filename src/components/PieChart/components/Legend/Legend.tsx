import React from 'react';

import {Series} from '../../types';
import {uniqueId} from '../../../../utilities';

import styles from './Legend.scss';
import {LegendPreview} from './components';

interface Props {
  series: Series[];
  ariaHidden?: boolean;
}

export function Legend({series, ariaHidden = false}: Props) {
  return (
    <div className={styles.Container} aria-hidden={ariaHidden}>
      <div>
        {series.map((series) => {
          return <LegendPreview series={series} key={uniqueId(series.name)} />;
        })}
      </div>
    </div>
  );
}

import React from 'react';
import tokens from '@shopify/polaris-tokens';

import {Color} from '../../../../types';

import styles from './Legend.scss';

interface Props {
  colors: Color[];
  dataCategories: string[];
}

export function Legend({colors, dataCategories}: Props) {
  return (
    <div className={styles.Container}>
      {dataCategories.map((category, index) => {
        return (
          <div className={styles.Series} key={category}>
            <div
              style={{
                background: tokens[colors[index]],
                width: '10px',
                height: '10px',
              }}
            />
            <p className={styles.SeriesName}>{category}</p>
          </div>
        );
      })}
    </div>
  );
}

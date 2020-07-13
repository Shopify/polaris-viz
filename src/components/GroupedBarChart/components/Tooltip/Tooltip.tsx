import React from 'react';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';

import styles from './Tooltip.scss';

interface Props {
  colors: Color[];
  labels: string[];
  values: number[];
  formatValue(value: number): string;
}

export function Tooltip({colors, labels, values, formatValue}: Props) {
  return (
    <div className={styles.Container}>
      {colors.map((color, index) => (
        <React.Fragment key={color}>
          <div
            className={styles.ColorPreview}
            style={{background: tokens[color]}}
          />
          <strong>{labels[index]}</strong>
          <div className={styles.Value}>{formatValue(values[index])}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

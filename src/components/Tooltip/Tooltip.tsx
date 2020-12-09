import React from 'react';
import {Color} from 'types';

import {SquareColorPreview} from '../SquareColorPreview';

import styles from './Tooltip.scss';

interface Props {
  colors: Color[];
  labels: string[];
  values: string[];
  title?: string;
  total?: null | {
    label: string;
    value: string;
  };
}

export function Tooltip({title, colors, labels, values, total}: Props) {
  return (
    <div className={styles.Container}>
      {title == null ? null : <div className={styles.Title}>{title}</div>}
      {labels.map((label, index) => (
        <React.Fragment key={`${label}-${index}`}>
          <SquareColorPreview color={colors[index]} />
          <p className={styles.SeriesName}>{label}</p>
          <p className={styles.Value}>{values[index]}</p>
        </React.Fragment>
      ))}
      {total == null ? null : (
        <React.Fragment>
          <div />
          <p className={styles.SeriesName}>{total.label}</p>
          <p className={styles.Value}>{total.value}</p>
        </React.Fragment>
      )}
    </div>
  );
}

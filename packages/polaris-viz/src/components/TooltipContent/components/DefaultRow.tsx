import React from 'react';

import {SquareColorPreview} from '../../SquareColorPreview';
import type {Color} from '../../../types';
import styles from '../TooltipContent.scss';

export function DefaultRow({
  color,
  label,
  value,
}: {
  color: Color;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.Row}>
      <SquareColorPreview color={color} />
      <span>{label}</span>
      <span className={styles.Value}>{value}</span>
    </div>
  );
}

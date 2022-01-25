import React from 'react';

import {SquareColorPreview} from '../../SquareColorPreview';
import type {Color} from '../../../types';
import styles from '../TooltipContent.scss';

export function DefaultRow({
  color,
  label,
  value,
  isActive,
}: {
  color: Color;
  label: string;
  value: string;
  isActive: boolean;
}) {
  return (
    <div className={styles.Row} style={{opacity: isActive ? 1 : 0.5}}>
      <SquareColorPreview color={color} />
      <span>{label}</span>
      <span className={styles.Value}>{value}</span>
    </div>
  );
}

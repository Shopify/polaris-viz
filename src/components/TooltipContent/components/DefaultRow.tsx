import React from 'react';

import {
  COLOR_BLIND_ACTIVE_OPACITY,
  COLOR_BLIND_FADED_OPACITY,
} from '../../../constants';
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
    <div
      className={styles.Row}
      style={{
        opacity: isActive
          ? COLOR_BLIND_ACTIVE_OPACITY
          : COLOR_BLIND_FADED_OPACITY,
      }}
    >
      <SquareColorPreview color={color} />
      <span>{label}</span>
      <span className={styles.Value}>{value}</span>
    </div>
  );
}

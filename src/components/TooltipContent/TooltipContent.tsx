import React from 'react';
import type {Color} from 'types';

import {useTheme} from '../../hooks';
import {SquareColorPreview} from '../SquareColorPreview';

import styles from './TooltipContent.scss';

interface TooltipData {
  color: Color;
  label: string;
  value: string;
}

export interface TooltipContentProps {
  title?: string;
  data: TooltipData[];
  total?: null | {
    label: string;
    value: string;
  };
  theme?: string;
}

export function TooltipContent({
  title,
  data,
  total,
  theme,
}: TooltipContentProps) {
  const {tooltip} = useTheme(theme);

  return (
    <div
      className={styles.Container}
      style={{
        background: tooltip.backgroundColor,
        color: tooltip.labelColor,
      }}
    >
      {title == null ? null : <div className={styles.Title}>{title}</div>}
      {data.map(({color, label, value}, index) => (
        <React.Fragment key={`${label}-${index}`}>
          <SquareColorPreview color={color} />
          <p className={styles.Label}>{label}</p>
          <p
            className={styles.Value}
            style={{
              color: tooltip.valueColor,
            }}
          >
            {value}
          </p>
        </React.Fragment>
      ))}
      {total == null ? null : (
        <React.Fragment>
          <div />
          <p className={styles.Label}>{total.label}</p>
          <p className={styles.Value}>{total.value}</p>
        </React.Fragment>
      )}
    </div>
  );
}

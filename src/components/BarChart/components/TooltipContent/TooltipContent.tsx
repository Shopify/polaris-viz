import React from 'react';

import styles from './TooltipContent.scss';

export interface TooltipContentProps {
  label: string;
  value: string;
}

export function TooltipContent({label, value}: TooltipContentProps) {
  return (
    <div className={styles.Container}>
      <span>{label}</span>
      {value}
    </div>
  );
}

import React from 'react';

import styles from './TooltipContent.scss';

export interface TooltipContentProps {
  label: string;
  value: string;
}

export function TooltipContent({label, value}: TooltipContentProps) {
  return (
    <div
      className={styles.Container}
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
      }}
    >
      <span style={{color: '#607175'}}>{label}</span>
      <strong style={{fontSize: '20px', fontWeight: '400'}}>{value}</strong>
    </div>
  );
}

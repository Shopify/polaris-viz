import React from 'react';

import styles from './TooltipContent.scss';

interface Props {
  label: string;
  value: string;
}

export function TooltipContent({label, value}: Props) {
  return (
    <div className={styles.Container}>
      <strong>{label}</strong>
      {value}
    </div>
  );
}

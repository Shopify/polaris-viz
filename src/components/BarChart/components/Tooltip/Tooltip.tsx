import React from 'react';

import styles from './Tooltip.scss';

interface Props {
  label: string;
  value: string;
}

export function Tooltip({label, value}: Props) {
  return (
    <div className={styles.Tooltip}>
      <strong>{label}</strong>
      {value}
    </div>
  );
}

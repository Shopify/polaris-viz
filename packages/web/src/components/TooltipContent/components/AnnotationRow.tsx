import React from 'react';

import {useTheme} from '../../../hooks';
import styles from '../TooltipContent.scss';

export function AnnotationRow({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme?: string;
}) {
  const {tooltip} = useTheme(theme);

  return (
    <div
      className={styles.Row}
      style={{
        color: tooltip.labelColor,
        marginTop: -5,
      }}
    >
      <p className={styles.AnnotationLabel}>{label}</p>
      <p className={styles.AnnotationValue}>{value}</p>
    </div>
  );
}

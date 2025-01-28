import {useTheme} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import styles from './TooltipTitle.scss';

export function TooltipTitle({
  children,
  theme,
  color,
}: {
  children: ReactNode;
  theme: string;
  color?: string;
}) {
  const selectedTheme = useTheme(theme);

  return (
    <p
      className={styles.Title}
      style={{color: color ?? selectedTheme.tooltip.titleColor}}
    >
      {children}
    </p>
  );
}

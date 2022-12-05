import {useTheme} from '@shopify/polaris-viz-core';
import React, {ReactNode} from 'react';

import styles from './TooltipTitle.scss';

export function TooltipTitle({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) {
  const selectedTheme = useTheme(theme);

  return (
    <p
      className={styles.Title}
      style={{color: selectedTheme.tooltip.titleColor}}
    >
      {children}
    </p>
  );
}

import {FONT_SIZE, useTheme} from '@shopify/polaris-viz-core';
import React, {ReactNode} from 'react';

import styles from './TooltipSeriesName.scss';

export function TooltipSeriesName({
  children,
  theme,
}: {
  children: ReactNode;
  theme: string;
}) {
  const selectedTheme = useTheme(theme);

  return (
    <p
      className={styles.AxisTitle}
      style={{
        color: selectedTheme.tooltip.titleColor,
        fontSize: FONT_SIZE,
      }}
    >
      {children}
    </p>
  );
}

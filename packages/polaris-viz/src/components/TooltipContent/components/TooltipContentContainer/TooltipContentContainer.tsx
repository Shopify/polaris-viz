import {changeColorOpacity, useTheme} from '@shopify/polaris-viz-core';
import React from 'react';

import {TOOLTIP_BG_OPACITY} from '../../../../constants';
import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';

import styles from './TooltipContentContainer.scss';

export function TooltipContentContainer({children, maxWidth, theme}) {
  const {isFirefox} = useBrowserCheck();

  const selectedTheme = useTheme(theme);

  return (
    <div
      className={styles.Container}
      style={{
        background: changeColorOpacity(
          selectedTheme.tooltip.backgroundColor,
          isFirefox ? 1 : TOOLTIP_BG_OPACITY,
        ),
        maxWidth,
      }}
    >
      {children}
    </div>
  );
}

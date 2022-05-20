import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';
import React, {ReactNode} from 'react';

import {useTheme} from '../../../../../hooks';

export const SimpleContainer = ({
  children,
  height,
  theme = DEFAULT_THEME_NAME,
}: {
  children: ReactNode;
  height?: number;
  theme?: string;
}) => {
  const selectedTheme = useTheme(theme);

  return (
    <div
      style={{
        height,
        width: 'calc(100% - 40px)',
        background: selectedTheme.chartContainer.backgroundColor,
        borderRadius: 4,
        padding: '20px',
      }}
    >
      <div style={{height}}>{children}</div>
    </div>
  );
};

import React from 'react';
import {changeColorOpacity} from '@shopify/polaris-viz-core';

import styles from '../ChartSkeleton.scss';

export function Shimmer({backgroundColor}: {backgroundColor: string}) {
  const semiTransparentBackground = changeColorOpacity(backgroundColor, 0);

  return (
    <div
      className={styles.Shimmer}
      style={{
        background: `linear-gradient(-40deg,
            ${semiTransparentBackground} 10%,
            ${semiTransparentBackground} 35%,
            ${backgroundColor} 50%,
            ${semiTransparentBackground} 85%,
            ${semiTransparentBackground} 90%)`,
      }}
    />
  );
}

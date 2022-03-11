import React, {useMemo} from 'react';
import {
  isGradientType,
  LinearGradientWithStops,
  uniqueId,
} from '@shopify/polaris-viz-core';
import type {Color} from '@shopify/polaris-viz-core';

import styles from './Area.scss';

function getGradientFill(color: Color | null) {
  if (color == null) {
    return null;
  }

  return isGradientType(color)
    ? color
    : [
        {
          color,
          offset: 0,
        },
      ];
}

const MASK_GRADIENT = [
  {
    offset: 20,
    color: 'white',
  },
  {
    offset: 100,
    color: 'black',
  },
];

interface AreaProps {
  color: Color;
  areaPath: string;
  immediate: boolean;
}

export function Area({areaPath, color, immediate}: AreaProps) {
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const areaGradientColor = getGradientFill(color);

  return areaGradientColor == null ? null : (
    <React.Fragment>
      <defs>
        <mask id={maskId}>
          <path
            fill={`url(#${maskId}-gradient)`}
            d={areaPath}
            className={immediate ? undefined : styles.Area}
          />
        </mask>
        <LinearGradientWithStops
          id={`${maskId}-gradient`}
          y1="0%"
          y2="100%"
          gradient={MASK_GRADIENT}
        />

        <LinearGradientWithStops
          id={gradientId}
          y1="100%"
          y2="0%"
          gradient={areaGradientColor}
        />
      </defs>
      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        opacity="0.2"
      />
    </React.Fragment>
  );
}

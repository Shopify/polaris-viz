import React, {useMemo} from 'react';

import type {Color} from '../../../types';
import {LinearGradient, Defs, Path, Mask} from '../../../components';
import {isGradientType, uniqueId} from '../../../utilities';

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
  // eslint-disable-next-line react/no-unused-prop-types
  immediate: boolean;
}

export function Area({areaPath, color}: AreaProps) {
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const areaGradientColor = getGradientFill(color);

  return areaGradientColor == null ? null : (
    <React.Fragment>
      <Defs>
        <Mask id={maskId}>
          <Path fill={`url(#${maskId}-gradient)`} d={areaPath} />
        </Mask>
        <LinearGradient
          id={`${maskId}-gradient`}
          y1="0%"
          y2="100%"
          gradient={MASK_GRADIENT}
        />

        <LinearGradient
          id={gradientId}
          y1="100%"
          y2="0%"
          gradient={areaGradientColor}
        />
      </Defs>
      <Path
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        opacity="0.2"
      />
    </React.Fragment>
  );
}

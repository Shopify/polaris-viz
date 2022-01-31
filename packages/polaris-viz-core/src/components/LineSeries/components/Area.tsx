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
  immediate: boolean;
  native: boolean;
}

export function Area({areaPath, color, immediate, native = false}: AreaProps) {
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);

  const areaGradientColor = getGradientFill(color);

  return areaGradientColor == null ? null : (
    <React.Fragment>
      <Defs native={native}>
        <Mask native={native} id={maskId}>
          <Path
            native={native}
            fill={`url(#${maskId}-gradient)`}
            d={areaPath}
            // className={immediate ? undefined : styles.Area}
          />
        </Mask>
        <LinearGradient
          native={native}
          id={`${maskId}-gradient`}
          y1="0%"
          y2="100%"
          gradient={MASK_GRADIENT}
        />

        <LinearGradient
          native={native}
          id={gradientId}
          y1="100%"
          y2="0%"
          gradient={areaGradientColor}
        />
      </Defs>
      <Path
        native={native}
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        opacity="0.2"
      />
    </React.Fragment>
  );
}

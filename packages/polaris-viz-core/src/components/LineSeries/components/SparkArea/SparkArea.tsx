import React, {useMemo} from 'react';

import {usePolarisVizContext} from '../../../../hooks';
import type {Color} from '../../../../types';
import {LinearGradientWithStops} from '../../../../components';
import {isGradientType, uniqueId} from '../../../../utilities';

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

interface SparkAreaProps {
  color: Color;
  areaPath: string;
}

export function SparkArea({areaPath, color}: SparkAreaProps) {
  const gradientId = useMemo(() => uniqueId('spark-area-gradient'), []);
  const maskId = useMemo(() => uniqueId('spark-area-mask'), []);

  const areaGradientColor = getGradientFill(color);

  const {
    components: {Defs, Mask, Path},
  } = usePolarisVizContext();

  return areaGradientColor == null ? null : (
    <React.Fragment>
      <Defs>
        <Mask id={maskId}>
          <Path fill={`url(#${maskId}-gradient)`} d={areaPath} />
        </Mask>
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

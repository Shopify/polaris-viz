import {Fragment, useMemo} from 'react';
import type {SpringValue} from '@react-spring/core';

import {usePolarisVizContext} from '../../../../hooks';
import type {Color} from '../../../../types';
import {LinearGradientWithStops} from '../../../../components';
import {getGradientFromColor, uniqueId} from '../../../../utilities';

function getGradientFill(color: Color | null) {
  if (color == null) {
    return null;
  }

  return getGradientFromColor(color);
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
  areaPath: SpringValue<string | null> | string;
}

export function SparkArea({areaPath, color}: SparkAreaProps) {
  const gradientId = useMemo(() => uniqueId('spark-area-gradient'), []);
  const maskId = useMemo(() => uniqueId('spark-area-mask'), []);

  const areaGradientColor = getGradientFill(color);

  const {
    components: {Defs, Mask, Path},
    animated,
  } = usePolarisVizContext();
  const AnimatedPath = animated(Path);

  return areaGradientColor == null ? null : (
    <Fragment>
      <Defs>
        <Mask id={maskId}>
          <AnimatedPath fill={`url(#${maskId}-gradient)`} d={areaPath} />
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
      <AnimatedPath
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        opacity="0.2"
      />
    </Fragment>
  );
}

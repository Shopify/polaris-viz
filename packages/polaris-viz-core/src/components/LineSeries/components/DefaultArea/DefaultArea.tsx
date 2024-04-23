import {Fragment, useMemo} from 'react';
import type {SpringValue} from '@react-spring/core';

import type {LineChartDataSeriesWithDefaults} from '../../../../types';
import {uniqueId} from '../../../../utilities';
import {LinearGradientWithStops} from '../../../../components';
import {usePolarisVizContext} from '../../../../hooks';

const GRADIENT_ALPHA = 0.25;

export interface Props {
  series: LineChartDataSeriesWithDefaults;
  areaPath: SpringValue<string | null> | string;
}

export function DefaultArea({series: {areaColor}, areaPath}: Props) {
  const gradientId = useMemo(() => uniqueId('default-area-gradient'), []);
  const maskId = useMemo(() => uniqueId('default-area-mask'), []);
  const {
    components: {Path, Defs, Mask},
    animated,
  } = usePolarisVizContext();

  const AnimatedPath = animated(Path);

  if (areaPath == null || areaColor == null) {
    return null;
  }

  return (
    <Fragment>
      <Defs>
        <Mask id={maskId}>
          <AnimatedPath d={areaPath} fill={`url(#${maskId}-gradient)`} />
        </Mask>
        <LinearGradientWithStops
          id={`${maskId}-gradient`}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
          gradient={[
            {
              offset: 0,
              color: 'black',
            },
            {
              offset: 10,
              color: 'white',
            },
            {
              offset: 90,
              color: 'white',
            },
            {
              offset: 100,
              color: 'black',
            },
          ]}
        />
        <LinearGradientWithStops
          id={gradientId}
          x1="0%"
          x2="0%"
          y1="0%"
          y2="100%"
          gradient={[
            {offset: 0, stopOpacity: GRADIENT_ALPHA, color: areaColor},
            {offset: 100, stopOpacity: 0, color: areaColor},
          ]}
        />
      </Defs>

      <AnimatedPath
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        strokeWidth="0"
        stroke={areaColor}
        style={{pointerEvents: 'none'}}
      />
    </Fragment>
  );
}

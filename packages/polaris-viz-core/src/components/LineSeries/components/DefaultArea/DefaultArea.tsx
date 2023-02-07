import { Fragment, useMemo } from 'react';
import type {SpringValue} from '@react-spring/core';

import type {LineChartDataSeriesWithDefaults} from '../../../../types';
import {uniqueId} from '../../../../utilities';
import {LinearGradientWithStops} from '../../../../components';
import {usePolarisVizContext} from '../../../../hooks';

import {getGradientDetails} from './utilities/getGradientDetails';

export interface Props {
  series: LineChartDataSeriesWithDefaults;
  areaPath: SpringValue<string | null> | string;
}

export function DefaultArea({series, areaPath}: Props) {
  const gradientId = useMemo(() => uniqueId('default-area-gradient'), []);
  const maskId = useMemo(() => uniqueId('default-area-mask'), []);
  const {data, areaColor} = series;

  const {
    components: {Path, Defs, Mask},
    animated,
  } = usePolarisVizContext();

  const AnimatedPath = animated(Path);

  const gradientStops = useMemo(() => {
    return getGradientDetails(data).map((gradientStop) => ({
      ...gradientStop,
      color: areaColor as string,
    }));
  }, [areaColor, data]);

  if (areaPath == null || areaColor == null || gradientStops == null) {
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
          gradient={gradientStops}
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

import React, {useMemo} from 'react';

import type {LineChartDataSeriesWithDefaults} from '../../../../types';
import {uniqueId} from '../../../../utilities';
import {LinearGradientWithStops} from '../../../../components';

import {getGradientDetails} from './utilities/getGradientDetails';

export interface Props {
  series: LineChartDataSeriesWithDefaults;
  areaPath: string;
}

export function DefaultArea({series, areaPath}: Props) {
  const gradientId = useMemo(() => uniqueId('default-area-gradient'), []);
  const maskId = useMemo(() => uniqueId('default-area-mask'), []);
  const {data, areaColor} = series;

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
    <React.Fragment>
      <defs>
        <mask id={maskId}>
          <path d={areaPath} fill={`url(#${maskId}-gradient)`} />
        </mask>
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
      </defs>

      <path
        d={areaPath}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        strokeWidth="0"
        stroke={areaColor}
      />
    </React.Fragment>
  );
}

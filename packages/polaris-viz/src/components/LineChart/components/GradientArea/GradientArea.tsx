import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area} from 'd3-shape';
import {
  LinearGradientWithStops,
  curveStepRounded,
  uniqueId,
} from '@shopify/polaris-viz-core';

import type {DataPoint} from '../../../../types';
import type {DataWithDefaults} from '../../types';

import {getGradientDetails} from './utilities/get-gradient-details';

export interface Props {
  series: DataWithDefaults;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number>;
  hasSpline: boolean;
}

export function GradientArea({series, yScale, xScale, hasSpline}: Props) {
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);
  const {data, areaColor} = series;

  const areaGenerator = area<DataPoint>()
    .x((_: DataPoint, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({value}) => yScale(value ?? 0));

  if (hasSpline) {
    areaGenerator.curve(curveStepRounded);
  }

  const areaShape = areaGenerator(data);

  const gradientStops = useMemo(() => {
    return getGradientDetails(data).map((gradientStop) => ({
      ...gradientStop,
      color: areaColor as string,
    }));
  }, [areaColor, data]);

  if (areaShape == null || areaColor == null || gradientStops == null) {
    return null;
  }

  return (
    <React.Fragment>
      <defs>
        <mask id={maskId}>
          <path d={areaShape} fill={`url(#${maskId}-gradient)`} />
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
        d={areaShape}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
        strokeWidth="0"
        stroke={areaColor}
      />
    </React.Fragment>
  );
}

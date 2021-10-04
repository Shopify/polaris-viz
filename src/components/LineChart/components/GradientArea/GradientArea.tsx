import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {LinearGradient} from '../../../LinearGradient';
import {uniqueId, curveStepRounded} from '../../../../utilities';
import type {Data} from '../../../../types';
import type {SeriesWithDefaults} from '../../types';

import {getGradientDetails} from './utilities/get-gradient-details';

interface Props {
  series: SeriesWithDefaults;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number>;
  hasSpline: boolean;
}

export function GradientArea({series, yScale, xScale, hasSpline}: Props) {
  const gradientId = useMemo(() => uniqueId('gradient'), []);
  const maskId = useMemo(() => uniqueId('mask'), []);
  const {data, areaColor} = series;

  const areaGenerator = area<Data>()
    .x((_: Data, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({rawValue}: {rawValue: number}) => yScale(rawValue));

  if (hasSpline) {
    areaGenerator.curve(curveStepRounded);
  }

  const areaShape = areaGenerator(data);

  if (areaShape == null || areaColor == null) {
    return null;
  }

  const gradientStops = getGradientDetails(data).map((gradientStop) => ({
    ...gradientStop,
    color: areaColor,
  }));
  return (
    <React.Fragment>
      <defs>
        <mask id={maskId}>
          <path d={areaShape} fill={`url(#${maskId}-gradient)`} />
        </mask>
        <LinearGradient
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
        <LinearGradient
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

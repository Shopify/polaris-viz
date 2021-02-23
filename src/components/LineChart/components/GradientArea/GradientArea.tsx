import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {area} from 'd3-shape';

import {uniqueId, getColorValue, rgbToRgba} from '../../../../utilities';
import {Data} from '../../../../types';
import {Series} from '../../types';

import {getGradientDetails} from './utilities/get-gradient-details';

interface Props {
  series: Series;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleLinear<number, number>;
}

export function GradientArea({series, yScale, xScale}: Props) {
  const id = useMemo(() => uniqueId('gradient'), []);
  const {data, color} = series;

  const areaShape = area<Data>()
    .x((_: Data, index: number) => xScale(index))
    .y0(yScale(0))
    .y1(({rawValue}: {rawValue: number}) => yScale(rawValue))(data);

  if (areaShape == null || color == null) {
    return null;
  }

  const rgb = getColorValue(color);
  const gradientStops = getGradientDetails(data);

  return (
    <React.Fragment>
      <defs>
        <linearGradient id={`${id}`} x1="0%" x2="0%" y1="0%" y2="100%">
          {gradientStops.map(({percent, alpha}) => (
            <stop
              key={percent}
              offset={`${percent}%`}
              stopColor={rgbToRgba({rgb, alpha})}
            />
          ))}
        </linearGradient>
      </defs>

      <path
        d={areaShape}
        fill={`url(#${id})`}
        strokeWidth="0"
        stroke={series.color}
      />
    </React.Fragment>
  );
}

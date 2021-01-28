import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {Point} from '../../../Point';
import {getColorValue} from '../../../../utilities';
import type {Series} from '../../types';

interface Props {
  path: string;
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activePointIndex: number | null;
}

export function Line({path, series, xScale, yScale, activePointIndex}: Props) {
  const {color, lineStyle, data} = series;

  return (
    <React.Fragment>
      <path
        d={path}
        fill="none"
        strokeWidth="2px"
        paintOrder="stroke"
        stroke={getColorValue(color)}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={lineStyle === 'dashed' ? '2 4' : 'unset'}
      />

      {data.map(({rawValue}, index) => {
        return (
          <Point
            key={index}
            color={color}
            cx={xScale(index)}
            cy={yScale(rawValue)}
            active={index === activePointIndex}
          />
        );
      })}
    </React.Fragment>
  );
}

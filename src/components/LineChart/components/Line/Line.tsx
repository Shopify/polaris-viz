import React from 'react';
import {ScaleLinear} from 'd3-scale';
import tokens from '@shopify/polaris-tokens';

import {Series} from '../../types';

import {Point} from './components';

interface Props {
  path: string;
  series: Series;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  activePointIndex: number | null;
}

export function Line({path, series, xScale, yScale, activePointIndex}: Props) {
  const {style = {}, data} = series;
  const {color = 'colorPurple', lineStyle = 'solid'} = style;

  return (
    <React.Fragment>
      <path
        d={path}
        fill="none"
        strokeWidth="2px"
        paintOrder="stroke"
        stroke={tokens[color]}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={lineStyle === 'dashed' ? '2 4' : 'unset'}
      />

      {data.map(({y}, index) => {
        return (
          <Point
            key={index}
            color={color}
            cx={xScale(index)}
            cy={yScale(y)}
            active={index === activePointIndex}
          />
        );
      })}
    </React.Fragment>
  );
}

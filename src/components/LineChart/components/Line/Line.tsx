import React from 'react';
import {line, curveMonotoneX} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';

interface Props {
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  hasSpline: boolean;
  lineWidth: number;
}

export const Line = React.memo(function Shape({
  hasSpline,
  series,
  xScale,
  yScale,
  lineWidth,
}: Props) {
  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

  if (hasSpline) {
    lineGenerator.curve(curveMonotoneX);
  }

  const path = lineGenerator(series.data);

  if (path == null) {
    return null;
  }

  return (
    <React.Fragment>
      <defs>
        <linearGradient id="carysgradient1" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="lightseagreen" />
          <stop offset="100%" stopColor="violet" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        strokeWidth={`${lineWidth}px`}
        paintOrder="stroke"
        stroke={
          series.lineStyle === 'dashed'
            ? getColorValue(series.color)
            : 'url(#carysgradient1)'
        }
        strokeLinejoin="round"
        strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
        {...(series.lineStyle === 'dashed'
          ? {
              ...{
                strokeLinecap: 'round',
                strokeDasharray: '0.1, 8',
              },
            }
          : undefined)}
      />
    </React.Fragment>
  );
});

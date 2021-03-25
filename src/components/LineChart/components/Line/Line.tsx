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
    <path
      d={path}
      fill="none"
      strokeWidth={`${lineWidth}px`}
      paintOrder="stroke"
      stroke={getColorValue(series.color)}
      strokeLinejoin="round"
      strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
      {...(series.lineStyle === 'dashed'
        ? {
            ...{
              strokeWidth: lineWidth,
              strokeLinecap: 'round',
              strokeDasharray: '0.1, 8',
            },
          }
        : undefined)}
    />
  );
});

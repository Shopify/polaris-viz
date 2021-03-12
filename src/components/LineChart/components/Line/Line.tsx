import React from 'react';
import {line} from 'd3-shape';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../utilities';
import {Series} from '../../types';

interface Props {
  series: Required<Series>;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
}

export const Line = React.memo(function Shape({series, xScale, yScale}: Props) {
  const lineGenerator = line<{rawValue: number}>()
    .x((_, index) => xScale(index))
    .y(({rawValue}) => yScale(rawValue));

  const path = lineGenerator(series.data);

  if (path == null) return null;

  return (
    <path
      d={path}
      fill="none"
      strokeWidth="2px"
      paintOrder="stroke"
      stroke={getColorValue(series.color)}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={series.lineStyle === 'dashed' ? '2 4' : 'unset'}
    />
  );
});

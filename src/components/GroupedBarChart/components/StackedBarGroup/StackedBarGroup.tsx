import React from 'react';
import {ScaleLinear, ScaleBand} from 'd3-scale';
import {Color} from 'types';

import {StackSeries} from '../../types';
import {BAR_SPACING} from '../../constants';
import {getColorValue} from '../../../../utilities';

interface Props {
  groupIndex: number;
  data: StackSeries;
  yScale: ScaleLinear<number, number>;
  xScale: ScaleBand<string>;
  colors: Color[];
}

export function StackedBarGroup({
  groupIndex,
  data,
  yScale,
  xScale,
  colors,
}: Props) {
  const barWidth = xScale.bandwidth() - BAR_SPACING;

  return (
    <g>
      {data.map(([start, end], barIndex) => {
        const xPosition = xScale(barIndex.toString());
        return (
          <rect
            key={barIndex}
            x={xPosition}
            y={yScale(end)}
            height={Math.abs(yScale(end) - yScale(start))}
            width={barWidth}
            fill={getColorValue(colors[groupIndex])}
          />
        );
      })}
    </g>
  );
}

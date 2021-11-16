import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../../constants';

interface VerticalGridLinesProps {
  chartHeight: number;
  stroke: string;
  ticks: number[];
  xScale: ScaleLinear<number, number>;
}

export const VerticalGridLines = ({
  chartHeight,
  ticks,
  xScale,
  stroke,
}: VerticalGridLinesProps) => {
  return (
    <g
      transform={`translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT})`}
      aria-hidden="true"
    >
      {ticks.map((value, index) => {
        if (value === 0) {
          return null;
        }

        return (
          <line
            key={index}
            y1={0}
            y2={chartHeight - HORIZONTAL_GROUP_LABEL_HEIGHT}
            stroke={stroke}
            transform={`translate(${xScale(value)},0)`}
          />
        );
      })}
    </g>
  );
};

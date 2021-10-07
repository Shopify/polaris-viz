import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {LABEL_HEIGHT} from '../constants';

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
    <g transform={`translate(0, ${LABEL_HEIGHT})`} aria-hidden="true">
      {ticks.map((value, index) => {
        return (
          <line
            key={index}
            y1={0}
            y2={chartHeight - LABEL_HEIGHT * 2}
            stroke={stroke}
            transform={`translate(${xScale(value)},0)`}
          />
        );
      })}
    </g>
  );
};

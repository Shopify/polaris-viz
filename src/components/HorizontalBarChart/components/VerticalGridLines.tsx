import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {LABEL_HEIGHT, SPACE_BETWEEN_SERIES_AND_LABELS} from '../constants';

interface VerticalGridLinesProps {
  seriesAreaHeight: number;
  stroke: string;
  ticks: number[];
  xScale: ScaleLinear<number, number>;
}

export const VerticalGridLines = ({
  seriesAreaHeight,
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
            y2={seriesAreaHeight - SPACE_BETWEEN_SERIES_AND_LABELS}
            stroke={stroke}
            transform={`translate(${xScale(value)},0)`}
          />
        );
      })}
    </g>
  );
};

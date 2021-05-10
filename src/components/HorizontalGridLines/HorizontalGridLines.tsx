import React from 'react';

import {YAxisTick} from '../../types';

interface Props {
  ticks: YAxisTick[];
  color: string;
  transform: {x: number; y: number};
  width: number;
}

export function HorizontalGridLines({ticks, color, transform, width}: Props) {
  return (
    <React.Fragment>
      {ticks.map(({yOffset}, index) => (
        <line
          key={index}
          x2={width}
          stroke={color}
          transform={`translate(${transform.x},${transform.y + yOffset})`}
        />
      ))}
    </React.Fragment>
  );
}

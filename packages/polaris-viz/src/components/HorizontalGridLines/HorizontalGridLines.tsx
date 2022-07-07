import React from 'react';
import {useTheme} from '@shopify/polaris-viz-core';

import type {YAxisTick} from '../../types';

export interface Props {
  theme: string;
  ticks: YAxisTick[];
  transform: {x: number; y: number};
  width: number;
}

export const HorizontalGridLines = React.memo(function HorizontalGridLines({
  ticks,
  transform,
  width,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {ticks.map(({yOffset}, index) => (
        <line
          key={index}
          x2={width}
          stroke={selectedTheme.grid.color}
          transform={`translate(${transform.x},${transform.y + yOffset})`}
        />
      ))}
    </React.Fragment>
  );
});

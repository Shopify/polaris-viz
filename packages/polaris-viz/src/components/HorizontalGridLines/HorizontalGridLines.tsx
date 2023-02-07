import {memo, Fragment} from 'react';
import {useTheme} from '@shopify/polaris-viz-core';

import type {YAxisTick} from '../../types';

export interface Props {
  ticks: YAxisTick[];
  transform: {x: number; y: number};
  width: number;
}

export const HorizontalGridLines = memo(function HorizontalGridLines({
  ticks,
  transform,
  width,
}: Props) {
  const selectedTheme = useTheme();

  return (
    <Fragment>
      {ticks.map(({yOffset}, index) => (
        <line
          key={index}
          x2={width}
          stroke={selectedTheme.grid.color}
          transform={`translate(${transform.x},${transform.y + yOffset})`}
        />
      ))}
    </Fragment>
  );
});

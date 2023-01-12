import React from 'react';
import {
  useTheme,
  ChartState,
  Dimensions,
  DEFAULT_BORDER_RADIUS,
} from '@shopify/polaris-viz-core';

import {ErrorText} from '../ErrorText';

interface Props {
  dimensions: Dimensions;
  state: ChartState;
  errorText: string;
}

export function SparkSkeleton({dimensions, state, errorText}: Props) {
  const {width, height} = dimensions;

  const {
    grid: {color: gridColor},
  } = useTheme();

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {state === ChartState.Loading && (
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={gridColor}
          rx={DEFAULT_BORDER_RADIUS}
        />
      )}
      {state === ChartState.Error && (
        <ErrorText errorText={errorText} width={width} height={height} />
      )}
    </svg>
  );
}

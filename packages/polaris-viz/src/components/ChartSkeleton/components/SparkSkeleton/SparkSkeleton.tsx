import React from 'react';
import {
  useTheme,
  ChartState,
  DEFAULT_BORDER_RADIUS,
} from '@shopify/polaris-viz-core';

import type {ChartSkeletonProps} from '../../ChartSkeleton';
import {ErrorText} from '../ErrorText';

export function SparkSkeleton({
  dimensions,
  state,
  errorText,
}: Omit<Required<ChartSkeletonProps>, 'type' | 'theme'>) {
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

import React from 'react';
import {
  Dimensions,
  ChartState,
  useTheme,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';

import {
  GridSkeleton,
  DonutSkeleton,
  FunnelSkeleton,
  Shimmer,
  SimpleBarSkeleton,
  SimpleNormalizedSkeleton,
  SparkSkeleton,
} from './components';
import styles from './ChartSkeleton.scss';

export type SkeletonType =
  | 'Default'
  | 'Donut'
  | 'Funnel'
  | 'SimpleBar'
  | 'Spark'
  | 'SimpleNormalized';

export interface ChartSkeletonProps {
  dimensions?: Dimensions;
  state?: ChartState;
  errorText?: string;
  theme?: string;
  type?: SkeletonType;
}

export function ChartSkeleton({
  dimensions,
  state = ChartState.Loading,
  errorText = 'Could not load the chart',
  theme = DEFAULT_THEME_NAME,
  type = 'Default',
}: ChartSkeletonProps) {
  const {
    chartContainer: {backgroundColor},
  } = useTheme(theme);

  const {width, height} = dimensions || {width: 0, height: 0};

  const SkeletonMarkup = () => {
    switch (type) {
      case 'Donut':
        return (
          <DonutSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );
      case 'Funnel':
        return (
          <FunnelSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );
      case 'SimpleBar':
        return (
          <SimpleBarSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );
      case 'SimpleNormalized':
        return (
          <SimpleNormalizedSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );
      case 'Spark':
        return (
          <SparkSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );

      default:
        return (
          <GridSkeleton
            dimensions={{
              width,
              height,
            }}
            state={state}
            errorText={errorText}
          />
        );
    }
  };

  if (width === 0) return null;

  return (
    <div className={styles.Container}>
      <SkeletonMarkup />
      {state === ChartState.Loading && (
        <Shimmer
          backgroundColor={backgroundColor}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

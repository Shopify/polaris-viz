import React from 'react';
import {Dimensions, ChartState, useTheme} from '@shopify/polaris-viz-core';

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
  type?: SkeletonType;
}

export function ChartSkeleton({
  dimensions,
  state = ChartState.Loading,
  errorText = 'Could not load the chart',
  type = 'Default',
}: ChartSkeletonProps) {
  const {
    chartContainer: {backgroundColor},
  } = useTheme();

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
        break;
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
        break;
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
        break;
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
        break;
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
        break;

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
        break;
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

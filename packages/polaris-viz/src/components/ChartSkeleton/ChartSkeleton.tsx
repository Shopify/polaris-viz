import React from 'react';
import {
  DEFAULT_THEME_NAME,
  Dimensions,
  ChartState,
  useTheme,
} from '@shopify/polaris-viz-core';

import {GridSkeleton, DonutSkeleton, Shimmer} from './components';
import styles from './ChartSkeleton.scss';

type SkeletonType = 'Default' | 'Donut';
export interface ChartSkeletonProps {
  theme?: string;
  dimensions?: Dimensions;
  state?: ChartState;
  errorText?: string;
  type: SkeletonType;
}

export function ChartSkeleton({
  dimensions,
  theme = DEFAULT_THEME_NAME,
  state = ChartState.Loading,
  errorText = 'Could not load the chart',
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
            theme={theme}
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
            theme={theme}
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

import type {BoundingRect} from '@shopify/polaris-viz-core';
import {ChartState, useTheme} from '@shopify/polaris-viz-core';

import type {Size} from '../SimpleNormalizedChart';

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

interface ChartSkeletonProps {
  // containerBounds is optional because it's passed down
  // from ContainerBounds with cloneElement.
  containerBounds?: BoundingRect;
  errorText?: string;
  state?: ChartState;
  theme?: string;
}

interface DefaultSkeletonProps extends ChartSkeletonProps {
  type?: 'Default';
}

export interface DonutSkeletonProps extends ChartSkeletonProps {
  type: 'Donut';
}

export interface FunnelSkeletonProps extends ChartSkeletonProps {
  type: 'Funnel';
}

export interface SimpleBarSkeletonProps extends ChartSkeletonProps {
  type: 'SimpleBar';
}

export interface SparkSkeletonProps extends ChartSkeletonProps {
  type: 'Spark';
}

export interface SimpleNormalizedSkeletonProps extends ChartSkeletonProps {
  type: 'SimpleNormalized';
  showLegend?: boolean;
  size?: Size;
}

export type Props =
  | DefaultSkeletonProps
  | DonutSkeletonProps
  | FunnelSkeletonProps
  | SimpleBarSkeletonProps
  | SimpleNormalizedSkeletonProps
  | SparkSkeletonProps;

export function ChartSkeleton(props: Props) {
  const {
    containerBounds,
    errorText = 'Could not load the chart',
    state = ChartState.Loading,
    theme,
    type,
  } = props;

  const {
    chartContainer: {backgroundColor},
  } = useTheme(theme);

  const containerDimensions = {
    height: containerBounds?.height ?? 0,
    width: containerBounds?.width ?? 0,
  };

  const SkeletonMarkup = () => {
    switch (type) {
      case 'Donut':
        return (
          <DonutSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
          />
        );
      case 'Funnel':
        return (
          <FunnelSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
          />
        );
      case 'SimpleBar':
        return (
          <SimpleBarSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
          />
        );
      case 'SimpleNormalized': {
        const {showLegend = true, size = 'small'} = props;
        return (
          <SimpleNormalizedSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
            showLegend={showLegend}
            size={size}
          />
        );
      }
      case 'Spark':
        return (
          <SparkSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
          />
        );

      default:
        return (
          <GridSkeleton
            containerDimensions={containerDimensions}
            state={state}
            errorText={errorText}
          />
        );
    }
  };

  if (containerDimensions.width === 0) return null;

  return (
    <div className={styles.Container}>
      <SkeletonMarkup />
      {state === ChartState.Loading && (
        <Shimmer
          backgroundColor={backgroundColor}
          width={containerDimensions.width}
          height={containerDimensions.height}
        />
      )}
    </div>
  );
}

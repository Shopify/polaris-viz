import type {Dimensions} from '@shopify/polaris-viz-core';
import {
  ChartState,
  useTheme,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';

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
  dimensions?: Dimensions;
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

type Props =
  | DefaultSkeletonProps
  | DonutSkeletonProps
  | FunnelSkeletonProps
  | SimpleBarSkeletonProps
  | SimpleNormalizedSkeletonProps
  | SparkSkeletonProps;

export function ChartSkeleton(props: Props) {
  const {
    dimensions,
    errorText = 'Could not load the chart',
    state = ChartState.Loading,
    theme = DEFAULT_THEME_NAME,
    type,
  } = props;

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
      case 'SimpleNormalized': {
        const {showLegend = true, size = 'small'} = props;
        return (
          <SimpleNormalizedSkeleton
            dimensions={{
              width,
              height,
            }}
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

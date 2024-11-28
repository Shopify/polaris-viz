import {ChartState, useChartContext, useTheme} from '@shopify/polaris-viz-core';

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
  const {containerBounds} = useChartContext();

  const {
    errorText = 'Could not load the chart',
    state = ChartState.Loading,
    theme,
    type,
  } = props;

  const {
    chartContainer: {backgroundColor},
  } = useTheme(theme);

  const SkeletonMarkup = () => {
    switch (type) {
      case 'Donut':
        return <DonutSkeleton state={state} errorText={errorText} />;
      case 'Funnel':
        return <FunnelSkeleton state={state} errorText={errorText} />;
      case 'SimpleBar':
        return <SimpleBarSkeleton state={state} errorText={errorText} />;
      case 'SimpleNormalized': {
        const {showLegend = true, size = 'small'} = props;
        return (
          <SimpleNormalizedSkeleton
            state={state}
            errorText={errorText}
            showLegend={showLegend}
            size={size}
          />
        );
      }
      case 'Spark':
        return <SparkSkeleton state={state} errorText={errorText} />;

      default:
        return <GridSkeleton state={state} errorText={errorText} />;
    }
  };

  if (containerBounds.width === 0) return null;

  return (
    <div className={styles.Container}>
      <SkeletonMarkup />
      {state === ChartState.Loading && (
        <Shimmer backgroundColor={backgroundColor} />
      )}
    </div>
  );
}

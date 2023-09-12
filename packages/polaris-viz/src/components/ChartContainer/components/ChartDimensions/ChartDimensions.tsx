import type {Dispatch, ReactElement, SetStateAction} from 'react';
import {cloneElement, useCallback, useLayoutEffect, useState} from 'react';
import type {
  DataGroup,
  DataSeries,
  Dimensions,
  ErrorBoundaryResponse,
  BoundingRect,
} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  usePrevious,
  useTheme,
} from '@shopify/polaris-viz-core';
import {useDebouncedCallback} from 'use-debounce';
import type {SkeletonType} from 'components/ChartSkeleton';

import {ChartErrorBoundary} from '../../../ChartErrorBoundary';
import {usePrintResizing, useResizeObserver} from '../../../../hooks';

import styles from './ChartDimensions.scss';

interface ChartDimensionsProps {
  children: ReactElement;
  data: DataSeries[] | DataGroup[];
  onIsPrintingChange: Dispatch<SetStateAction<boolean>>;
  sparkChart?: boolean;
  skeletonType?: SkeletonType;
  onError?: ErrorBoundaryResponse;
}

export function ChartDimensions({
  children,
  data,
  onIsPrintingChange,
  sparkChart = false,
  skeletonType = 'Default',
  onError,
}: ChartDimensionsProps) {
  const {chartContainer} = useTheme();
  const {onError: onErrorProvider} = usePolarisVizContext();

  const [chartDimensions, setChartDimensions] =
    useState<BoundingRect | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

  usePrintResizing({
    ref,
    setChartDimensions,
    onIsPrintingChange,
  });

  const updateDimensions = useCallback(() => {
    if (
      (previousEntry?.contentRect.width === entry?.contentRect.width &&
        previousEntry?.contentRect.height === entry?.contentRect.height) ||
      entry == null
    ) {
      return;
    }

    const {width, height} = entry.contentRect;
    const {x, y} = entry.target.getBoundingClientRect();

    setChartDimensions({width, height, x, y: y + window.scrollY});
  }, [entry, previousEntry?.contentRect]);

  const debouncedUpdateDimensions = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();

    if (chartDimensions === null) {
      setChartDimensions({
        width: 0,
        height: sparkChart
          ? chartContainer.sparkChartMinHeight
          : chartContainer.minHeight,
        x: 0,
        y: 0,
      });
    }

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
      }
    };
  }, [
    entry,
    updateDimensions,
    debouncedUpdateDimensions,
    chartDimensions,
    chartContainer.minHeight,
    sparkChart,
    chartContainer.sparkChartMinHeight,
  ]);

  return (
    <div
      className={styles.ChartDimensions}
      ref={setRef}
      style={{
        minHeight: sparkChart
          ? chartContainer.sparkChartMinHeight
          : chartContainer.minHeight,
      }}
    >
      {!hasValidDimensions(chartDimensions) ? null : (
        <ChartErrorBoundary
          type={skeletonType ?? 'Default'}
          dimensions={chartDimensions!}
          data={data}
          onError={onError ?? onErrorProvider}
        >
          <div
            className={styles.Chart}
            style={{
              height: chartDimensions!.height,
              width: chartDimensions!.width,
            }}
          >
            {cloneElement<{
              dimensions: Dimensions;
            }>(children, {
              dimensions: chartDimensions!,
            })}
          </div>
        </ChartErrorBoundary>
      )}
    </div>
  );
}

function hasValidDimensions(chartDimensions: Dimensions | null) {
  if (chartDimensions == null) {
    return false;
  }

  return chartDimensions.width > 0 && chartDimensions.height > 0;
}

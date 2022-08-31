import React, {
  cloneElement,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import {
  DataGroup,
  DataSeries,
  Dimensions,
  usePrevious,
  useTheme,
} from '@shopify/polaris-viz-core';
import {useDebouncedCallback} from 'use-debounce/lib';
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
}

export function ChartDimensions({
  children,
  data,
  onIsPrintingChange,
  sparkChart = false,
  skeletonType = 'Default',
}: ChartDimensionsProps) {
  const {chartContainer} = useTheme();

  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

  usePrintResizing({
    ref,
    setChartDimensions,
    onIsPrintingChange,
  });

  const updateDimensions = useCallback(() => {
    if (
      previousEntry?.contentRect.width === entry?.contentRect.width ||
      entry == null
    ) {
      return;
    }

    const {width, height} = entry.contentRect;

    setChartDimensions({width, height});
  }, [entry, previousEntry?.contentRect.width]);

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
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

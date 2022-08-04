import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
  cloneElement,
  useMemo,
} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';
import {
  usePrevious,
  uniqueId,
  ChartContext,
  DataGroup,
  DataSeries,
  isLargeDataSet,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {getChartId} from '../../utilities/getChartId';
import {ChartErrorBoundary} from '../ChartErrorBoundary';
import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';
import {
  useResizeObserver,
  useTheme,
  usePrintResizing,
  usePrefersReducedMotion,
} from '../../hooks';
import type {SkeletonType} from '../ChartSkeleton';

import styles from './ChartContainer.scss';

function hasValidDimensions(chartDimensions: Dimensions | null) {
  if (chartDimensions == null) {
    return false;
  }

  return chartDimensions.width > 0 && chartDimensions.height > 0;
}

interface Props {
  children: ReactElement;
  data: DataSeries[] | DataGroup[];
  isAnimated: boolean;
  theme: string;
  sparkChart?: boolean;
  skeletonType?: SkeletonType;
  type?: InternalChartType;
}

export const ChartContainer = (props: Props) => {
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});

  const value = useMemo(() => {
    const tooBigToAnimate = isLargeDataSet(props.data, props.type);

    const shouldAnimate =
      props.isAnimated && !prefersReducedMotion && !tooBigToAnimate;
    const id = uniqueId('chart');
    const printFriendlyTheme = isPrinting ? 'Print' : props.theme;

    return {
      shouldAnimate,
      id,
      characterWidths,
      characterWidthOffsets,
      theme: printFriendlyTheme,
      isPerformanceImpacted: tooBigToAnimate,
    };
  }, [
    prefersReducedMotion,
    props.data,
    props.isAnimated,
    props.theme,
    props.type,
    isPrinting,
  ]);

  const {chartContainer} = useTheme(value.theme);

  const updateDimensions = useCallback(() => {
    if (
      previousEntry?.contentRect.width === entry?.contentRect.width ||
      entry == null
    )
      return;

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
        height: props.sparkChart
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
    props.sparkChart,
    chartContainer.sparkChartMinHeight,
  ]);

  return (
    <ChartContext.Provider value={value}>
      <div
        className={styles.ChartContainer}
        style={{
          background: chartContainer.backgroundColor,
          padding: chartContainer.padding,
          borderRadius: chartContainer.borderRadius,
          minHeight: props.sparkChart
            ? chartContainer.sparkChartMinHeight
            : chartContainer.minHeight,
        }}
        ref={setRef}
        id={getChartId(value.id)}
      >
        {!hasValidDimensions(chartDimensions) ? null : (
          <ChartErrorBoundary
            type={props.skeletonType ?? 'Default'}
            dimensions={chartDimensions!}
          >
            {cloneElement<{
              dimensions: Dimensions;
            }>(props.children, {
              dimensions: chartDimensions!,
            })}
          </ChartErrorBoundary>
        )}
      </div>
    </ChartContext.Provider>
  );
};

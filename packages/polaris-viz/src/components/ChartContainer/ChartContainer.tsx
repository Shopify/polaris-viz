import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
  cloneElement,
  useMemo,
} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';
import {uniqueId, ChartContext} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import characterWidths from '../../data/character-widths.json';
import characterWidthOffsets from '../../data/character-width-offsets.json';
import {
  useResizeObserver,
  useTheme,
  usePrintResizing,
  usePrevious,
  usePrefersReducedMotion,
} from '../../hooks';

import styles from './ChartContainer.scss';

function hasValidDimensions(chartDimensions: Dimensions | null) {
  if (chartDimensions == null) {
    return false;
  }

  return chartDimensions.width > 0 || chartDimensions.height > 0;
}

interface Props {
  children: ReactElement;
  theme: string;
  sparkChart?: boolean;
  isAnimated?: boolean;
}

export const ChartContainer = (props: Props) => {
  const value = useMemo(() => {
    const id = uniqueId('chart');
    return {
      id,
      characterWidths,
      characterWidthOffsets,
    };
  }, []);

  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});
  const printFriendlyTheme = isPrinting ? 'Print' : props.theme;
  const {chartContainer} = useTheme(printFriendlyTheme);

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

  const {prefersReducedMotion} = usePrefersReducedMotion();

  const shouldAnimate = props.isAnimated && !prefersReducedMotion;

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
        id={`chart_${value.id}`}
      >
        {!hasValidDimensions(chartDimensions)
          ? null
          : cloneElement<{
              theme: string;
              dimensions: Dimensions;
              isAnimated: boolean;
            }>(props.children, {
              theme: printFriendlyTheme,
              dimensions: chartDimensions!,
              isAnimated: shouldAnimate,
            })}
      </div>
    </ChartContext.Provider>
  );
};

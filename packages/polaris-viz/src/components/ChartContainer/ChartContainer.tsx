import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
  cloneElement,
  useMemo,
} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';
import {uniqueId} from '@shopify/polaris-viz-core';
import type {Dimensions} from '@shopify/polaris-viz-core';

import characterWidths from '../../data/character-widths.json';
import {
  useResizeObserver,
  useTheme,
  usePrintResizing,
  usePrevious,
} from '../../hooks';

import styles from './ChartContainer.scss';
import {ChartContext} from './ChartContext';

interface Props {
  children: ReactElement;
  theme?: string;
  sparkChart?: boolean;
}

export const ChartContainer = (props: Props) => {
  const value = useMemo(() => {
    const id = uniqueId('chart');
    return {
      id,
      characterWidths,
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

  useLayoutEffect(() => {
    updateDimensions();

    if (chartDimensions === null) {
      setChartDimensions({
        width: 0,
        height: props.sparkChart
          ? chartContainer.sparkChartMinHeight
          : chartContainer.chartMinHeight,
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
    chartContainer.chartMinHeight,
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
            : chartContainer.chartMinHeight,
        }}
        ref={setRef}
        id={`chart_${value.id}`}
      >
        {chartDimensions == null
          ? null
          : cloneElement<{theme: string; dimensions: Dimensions}>(
              props.children,
              {
                theme: printFriendlyTheme,
                dimensions: chartDimensions,
              },
            )}
      </div>
    </ChartContext.Provider>
  );
};

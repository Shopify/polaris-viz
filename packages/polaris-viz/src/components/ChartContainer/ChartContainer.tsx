import React, {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
  cloneElement,
  useMemo,
} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';

import {uniqueId} from '../../utilities';
import type {Dimensions} from '../../types';
import {useResizeObserver, useTheme, usePrintResizing} from '../../hooks';

import styles from './ChartContainer.scss';
import {ChartContext} from './ChartContext';

interface Props {
  children: ReactElement;
  theme?: string;
}

export const ChartContainer = (props: Props) => {
  const value = useMemo(
    () => ({
      id: uniqueId('chart'),
    }),
    [],
  );

  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const {isPrinting} = usePrintResizing({ref, setChartDimensions});
  const printFriendlyTheme = isPrinting ? 'Print' : props.theme;
  const {chartContainer} = useTheme(printFriendlyTheme);

  const updateDimensions = useCallback(() => {
    if (entry != null) {
      const {width, height} = entry.contentRect;
      setChartDimensions((prevDimensions) => {
        if (
          prevDimensions != null &&
          width === prevDimensions.width &&
          height === prevDimensions.height
        ) {
          return prevDimensions;
        } else {
          return {width, height};
        }
      });
    }
  }, [entry]);

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);
      }
    };
  }, [entry, updateDimensions, debouncedUpdateDimensions]);

  return (
    <ChartContext.Provider value={value}>
      <div
        className={styles.ChartContainer}
        style={{
          background: chartContainer.backgroundColor,
          padding: chartContainer.padding,
          borderRadius: chartContainer.borderRadius,
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

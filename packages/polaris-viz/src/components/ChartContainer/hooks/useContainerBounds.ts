import type {BoundingRect} from '@shopify/polaris-viz-core';
import type {Dispatch, SetStateAction} from 'react';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {
  usePrevious,
  usePrintResizing,
  useResizeObserver,
  useTheme,
} from '../../../hooks';

export function useContainerBounds({
  onIsPrintingChange,
  scrollContainer,
  sparkChart,
}: {
  onIsPrintingChange: Dispatch<SetStateAction<boolean>>;
  scrollContainer?: Element | null;
  sparkChart?: boolean;
}) {
  const {chartContainer} = useTheme();

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

  const [containerBounds, setContainerBounds] =
    useState<BoundingRect | null>(null);

  usePrintResizing({
    ref,
    setContainerBounds,
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

    const scrollY =
      scrollContainer == null ? window.scrollY : scrollContainer.scrollTop;

    setContainerBounds({width, height, x, y: y + scrollY});
  }, [entry, previousEntry?.contentRect, scrollContainer]);

  const debouncedUpdateDimensions = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  useLayoutEffect(() => {
    updateDimensions();

    if (containerBounds === null) {
      setContainerBounds({
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
    containerBounds,
    chartContainer.minHeight,
    sparkChart,
    chartContainer.sparkChartMinHeight,
  ]);

  const updateContainerBounds = useCallback(() => {
    if (ref == null) {
      return;
    }

    const scrollY =
      scrollContainer == null ? window.scrollY : scrollContainer.scrollTop;

    const bounds = ref.getBoundingClientRect();

    setContainerBounds((prev) => {
      if (bounds.y === prev?.y && bounds.x === prev?.x) {
        return prev;
      }

      return {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y + scrollY,
      };
    });
  }, [ref, scrollContainer]);

  return {
    containerBounds,
    updateContainerBounds,
    setRef,
  };
}

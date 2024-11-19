import type {Dispatch, ReactElement, SetStateAction} from 'react';
import {cloneElement, useCallback, useLayoutEffect, useState} from 'react';
import type {
  DataGroup,
  DataSeries,
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

import styles from './ContainerBounds.scss';

interface ContainerBoundsProps {
  children: ReactElement;
  data: DataSeries[] | DataGroup[];
  onIsPrintingChange: Dispatch<SetStateAction<boolean>>;
  scrollContainer?: Element | null;
  sparkChart?: boolean;
  skeletonType?: SkeletonType;
  onError?: ErrorBoundaryResponse;
}

export function ContainerBounds({
  children,
  data,
  onIsPrintingChange,
  scrollContainer,
  sparkChart = false,
  skeletonType = 'Default',
  onError,
}: ContainerBoundsProps) {
  const {chartContainer} = useTheme();
  const {onError: onErrorProvider} = usePolarisVizContext();

  const [containerBounds, setContainerBounds] =
    useState<BoundingRect | null>(null);

  const {ref, setRef, entry} = useResizeObserver();

  const previousEntry = usePrevious(entry);

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

  const onMouseEnter = useCallback(() => {
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

  return (
    <div
      className={styles.ContainerBounds}
      ref={setRef}
      style={{
        minHeight: sparkChart
          ? chartContainer.sparkChartMinHeight
          : chartContainer.minHeight,
      }}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
    >
      {containerBounds == null || !hasValidBounds(containerBounds) ? null : (
        <ChartErrorBoundary
          type={skeletonType ?? 'Default'}
          containerBounds={containerBounds}
          data={data}
          onError={onError ?? onErrorProvider}
        >
          <div
            className={styles.Chart}
            style={{
              height: containerBounds.height,
              width: containerBounds.width,
            }}
          >
            {cloneElement<{
              containerBounds: BoundingRect;
            }>(children, {
              containerBounds,
            })}
          </div>
        </ChartErrorBoundary>
      )}
    </div>
  );
}

function hasValidBounds(containerBounds: BoundingRect) {
  return containerBounds.width > 0 && containerBounds.height > 0;
}

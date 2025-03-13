import type {ReactNode} from 'react';
import {useEffect, useMemo, useState} from 'react';
import type {
  BoundingRect,
  Dimensions,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import {useChartContext, usePrevious} from '@shopify/polaris-viz-core';

import {useResizeObserver} from '../../../hooks/useResizeObserver';
import {useRepositionTooltip} from '../hooks/useRepositionTooltip';

import styles from './TooltipAnimatedContainer.scss';

export interface TooltipAnimatedContainerProps {
  activePointIndex: number | null;
  chartType: InternalChartType;
  children: ReactNode;
  seriesBounds: BoundingRect | null;
  x: number;
  y: number;
  id?: string;
}

export function TooltipAnimatedContainer({
  activePointIndex,
  chartType,
  children,
  id = '',
  seriesBounds,
  x,
  y,
}: TooltipAnimatedContainerProps) {
  const {isPerformanceImpacted} = useChartContext();
  const repositionTooltip = useRepositionTooltip();
  const {setRef, entry} = useResizeObserver();

  const [tooltipDimensions, setTooltipDimensions] =
    useState<Dimensions | null>(null);
  const previousActivePointIndex = usePrevious(activePointIndex);

  useEffect(() => {
    if (entry == null) {
      return;
    }

    setTooltipDimensions((previous: Dimensions | null) => {
      if (entry == null || entry.target == null) {
        return previous;
      }

      const {width, height} = entry.target.getBoundingClientRect();

      if (previous?.width === width && previous?.height === height) {
        return previous;
      }

      return {
        width,
        height,
      };
    });
  }, [entry]);

  const {x: newX, y: newY} = useMemo(() => {
    // If we don't have any children, we shouldn't alter the position
    // of the tooltip because there are no tooltip bounds
    // to actually check.
    if (children == null) {
      return {x, y};
    }

    return repositionTooltip({
      chartType,
      seriesBounds,
      tooltipDimensions,
      x,
      y,
    });
  }, [
    chartType,
    seriesBounds,
    tooltipDimensions,
    x,
    y,
    repositionTooltip,
    children,
  ]);

  const shouldRenderImmediate =
    previousActivePointIndex === -1 || previousActivePointIndex === null;

  return (
    <div
      id={id}
      className={styles.Container}
      data-tooltip
      style={{
        top: 0,
        left: 0,
        opacity: !shouldRenderImmediate ? 1 : 0,
        transform: `translate3d(${Math.round(newX)}px, ${Math.round(
          newY,
        )}px, 0px)`,
        transformOrigin: 'right center',
        transition: isPerformanceImpacted
          ? 'none'
          : `opacity 300ms 150ms ease, transform 150ms ease`,
        willChange: 'opacity, transform',
      }}
      ref={setRef}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

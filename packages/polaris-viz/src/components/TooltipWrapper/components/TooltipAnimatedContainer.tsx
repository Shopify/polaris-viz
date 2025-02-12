import type {ReactNode} from 'react';
import {useEffect, useRef, useState, useMemo} from 'react';
import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';
import {useChartContext, InternalChartType} from '@shopify/polaris-viz-core';

import {useResizeObserver} from '../../../hooks/useResizeObserver';
import type {Margin} from '../../../types';
import type {TooltipPositionOffset} from '../types';
import {DEFAULT_TOOLTIP_POSITION} from '../constants';
import {getAlteredLineChartPosition} from '../utilities/getAlteredLineChartPosition';
import {getAlteredHorizontalBarPosition} from '../utilities/getAlteredHorizontalBarPosition';
import {getAlteredVerticalBarPosition} from '../utilities/getAlteredVerticalBarPosition';

import styles from './TooltipAnimatedContainer.scss';

export interface TooltipAnimatedContainerProps {
  children: ReactNode;
  margin: Margin;
  currentX: number;
  currentY: number;
  chartBounds: BoundingRect;
  chartType: InternalChartType;
  position?: TooltipPositionOffset;
  id?: string;
  bandwidth?: number;
}

export function TooltipAnimatedContainer({
  bandwidth = 0,
  chartBounds,
  chartType,
  children,
  currentX,
  currentY,
  id = '',
  margin,
  position = DEFAULT_TOOLTIP_POSITION,
}: TooltipAnimatedContainerProps) {
  const {
    isPerformanceImpacted,
    scrollContainer,
    containerBounds,
    isTouchDevice,
  } = useChartContext();

  const [tooltipDimensions, setTooltipDimensions] =
    useState<Dimensions | null>(null);
  const firstRender = useRef(true);

  const {setRef, entry} = useResizeObserver();

  const getAlteredPositionFunction = useMemo(() => {
    switch (chartType) {
      case InternalChartType.Line:
      case InternalChartType.Donut:
        return getAlteredLineChartPosition;
      case InternalChartType.HorizontalBar:
        return getAlteredHorizontalBarPosition;
      case InternalChartType.Bar:
      default:
        return getAlteredVerticalBarPosition;
    }
  }, [chartType]);

  const {x, y, opacity, immediate} = useMemo(() => {
    if (tooltipDimensions == null) {
      return {x: 0, y: 0, opacity: 0};
    }

    const {x, y} = getAlteredPositionFunction({
      currentX,
      currentY,
      position,
      tooltipDimensions,
      chartBounds,
      margin,
      bandwidth,
      isPerformanceImpacted,
      isTouchDevice,
      containerBounds,
      scrollContainer,
    });

    const shouldRenderImmediate = firstRender.current;
    firstRender.current = false;

    return {
      x,
      y,
      opacity: 1,
      immediate: isPerformanceImpacted || shouldRenderImmediate,
    };
  }, [
    bandwidth,
    chartBounds,
    currentX,
    currentY,
    getAlteredPositionFunction,
    margin,
    position,
    isPerformanceImpacted,
    tooltipDimensions,
    containerBounds,
    scrollContainer,
    isTouchDevice,
  ]);

  useEffect(() => {
    if (entry == null) {
      return;
    }

    setTooltipDimensions((previous: Dimensions | null) => {
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

  return (
    <div
      id={id}
      className={styles.Container}
      data-tooltip
      style={{
        top: 0,
        left: 0,
        opacity,
        transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0px)`,
        transition: immediate ? 'none' : 'opacity 300ms ease, transform 150ms',
      }}
      ref={setRef}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

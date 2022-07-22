import React, {useEffect, useRef, useState, ReactNode, useMemo} from 'react';
import {
  BoundingRect,
  Dimensions,
  useChartContext,
} from '@shopify/polaris-viz-core';

import type {Margin} from '../../../types';
import styles from '../TooltipContainer.scss';
import type {TooltipPositionOffset} from '../types';
import {getAlteredVerticalBarPosition} from '../utilities';
import type {AlteredPosition} from '../utilities';
import {DEFAULT_TOOLTIP_POSITION} from '../constants';

export interface TooltipAnimatedContainerProps {
  children: ReactNode;
  margin: Margin;
  activePointIndex: number;
  currentX: number;
  currentY: number;
  chartBounds: BoundingRect;
  getAlteredPosition?: AlteredPosition;
  position?: TooltipPositionOffset;
  id?: string;
  bandwidth?: number;
}

export function TooltipAnimatedContainer({
  activePointIndex,
  bandwidth = 0,
  chartBounds,
  children,
  currentX,
  currentY,
  id = '',
  getAlteredPosition = getAlteredVerticalBarPosition,
  margin,
  position = DEFAULT_TOOLTIP_POSITION,
}: TooltipAnimatedContainerProps) {
  const {isPerformanceImpacted} = useChartContext();

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] =
    useState<Dimensions | null>(null);
  const firstRender = useRef(true);

  const {x, y, opacity, immediate} = useMemo(() => {
    if (tooltipDimensions == null) {
      return {x: 0, y: 0, opacity: 0};
    }

    const {x, y} = getAlteredPosition({
      currentX,
      currentY,
      position,
      tooltipDimensions,
      chartBounds,
      margin,
      bandwidth,
      isPerformanceImpacted,
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
    getAlteredPosition,
    margin,
    position,
    isPerformanceImpacted,
    tooltipDimensions,
  ]);

  useEffect(() => {
    if (tooltipRef.current == null) {
      return;
    }

    setTooltipDimensions(tooltipRef.current.getBoundingClientRect());
  }, [activePointIndex]);

  return (
    <div
      id={id}
      className={styles.Container}
      data-tooltip
      style={{
        top: 0,
        left: 0,
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        transition: immediate
          ? 'none'
          : 'opacity 300ms ease, transform 300ms ease',
      }}
      ref={tooltipRef}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

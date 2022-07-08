import React, {useEffect, useRef, useState, ReactNode} from 'react';
import {useSpring, animated} from '@react-spring/web';
import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';

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
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const firstRender = useRef(true);

  const {x, y} = getAlteredPosition({
    currentX,
    currentY,
    position,
    tooltipDimensions,
    chartBounds,
    margin,
    bandwidth,
  });

  firstRender.current = false;

  useEffect(() => {
    if (tooltipRef.current == null) {
      return;
    }

    setTooltipDimensions(tooltipRef.current.getBoundingClientRect());
  }, [activePointIndex]);

  return (
    <animated.div
      id={id}
      className={styles.Container}
      data-tooltip
      style={{
        top: 0,
        left: 0,
        opacity: firstRender.current ? 0 : 1,
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        transition: 'transform 100ms',
      }}
      ref={tooltipRef}
      aria-hidden="true"
    >
      {children}
    </animated.div>
  );
}

import React, {useEffect, useRef, useState, ReactNode} from 'react';
import {useSpring, animated} from '@react-spring/web';
import type {Dimensions} from '@shopify/polaris-viz-core';

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
  chartDimensions: Dimensions;
  getAlteredPosition?: AlteredPosition;
  position?: TooltipPositionOffset;
  id?: string;
  bandwidth?: number;
}

export function TooltipAnimatedContainer({
  activePointIndex,
  bandwidth = 0,
  chartDimensions,
  children,
  currentX,
  currentY,
  id = '',
  getAlteredPosition = getAlteredVerticalBarPosition,
  margin,
  position = DEFAULT_TOOLTIP_POSITION,
}: TooltipAnimatedContainerProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipDimensions, setTooltipDimensions] =
    useState<Dimensions | null>(null);
  const firstRender = useRef(true);

  const spring: any = useSpring({
    from: {
      translate: [0, 0, 0],
      opacity: 0,
    },
    to: async (next: any) => {
      if (tooltipDimensions == null) {
        return;
      }

      const {x, y} = getAlteredPosition({
        currentX,
        currentY,
        position,
        tooltipDimensions,
        chartDimensions,
        margin,
        bandwidth,
      });

      const shouldRenderImmediate = firstRender.current;
      firstRender.current = false;

      // @react-spring/web docs do not return the `next` callback
      // eslint-disable-next-line node/callback-return
      await next({
        translate: [x, y, 0],
        opacity: 1,
        immediate: shouldRenderImmediate,
      });
    },
  });

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
      style={{
        top: 0,
        left: 0,
        opacity: spring.opacity,
        transform: spring.translate.to(
          // eslint-disable-next-line id-length
          (x: number, y: number, z: number) =>
            `translate3d(${x}px, ${y}px, ${z}px)`,
        ),
      }}
      ref={tooltipRef}
      aria-hidden="true"
    >
      {children}
    </animated.div>
  );
}

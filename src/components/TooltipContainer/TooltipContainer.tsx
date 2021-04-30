import React, {useRef, ReactNode} from 'react';

import {clamp} from '../../utilities';

import styles from './TooltipContainer.scss';

interface Props {
  children: ReactNode;
  margin: {Top: number; Left: number; Right: number; Bottom: number};
  activePointIndex: number;
  currentX: number;
  currentY: number;
  chartDimensions: DOMRect;
  position?: 'center' | 'auto';
  id?: string;
}

// The space between the cursor and the tooltip
const TOOLTIP_MARGIN = 10;

export function TooltipContainer({
  currentX,
  currentY,
  chartDimensions,
  children,
  margin,
  position = 'auto',
  id = '',
}: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  console.log('new one!!!');

  const calculatedPosition = () => {
    const tooltipDimensions =
      tooltipRef == null || tooltipRef.current == null
        ? null
        : tooltipRef.current.getBoundingClientRect();
    const tooltipWidth =
      tooltipDimensions == null ? 0 : tooltipDimensions.width;
    const tooltipHeight =
      tooltipDimensions == null ? 0 : tooltipDimensions.height;

    const chartLeftBound = margin.Left;
    const chartRightBound = chartDimensions.width - margin.Right;

    const naturalLeftBound = currentX - tooltipWidth - TOOLTIP_MARGIN;
    const hasSpaceToLeft = naturalLeftBound > chartLeftBound;

    const naturalRightBound = currentX + tooltipWidth + TOOLTIP_MARGIN;
    const hasSpaceToRight = naturalRightBound < chartRightBound;

    let xTranslation = 0;

    if (position === 'center') {
      xTranslation = clamp({
        amount: currentX - tooltipWidth / 2,
        max: chartRightBound - tooltipWidth,
        min: chartLeftBound,
      });
    } else if (hasSpaceToLeft) {
      xTranslation = naturalLeftBound;
    } else if (hasSpaceToRight) {
      xTranslation = currentX + TOOLTIP_MARGIN;
    } else {
      const centeredLeftBound = currentX - tooltipWidth / 2;
      const centeredRightBound = currentX + tooltipWidth / 2;

      if (centeredRightBound > chartRightBound) {
        xTranslation = chartRightBound - tooltipWidth;
      } else if (centeredLeftBound < chartLeftBound) {
        xTranslation = chartLeftBound;
      } else {
        xTranslation = centeredLeftBound;
      }
    }

    return [
      xTranslation,
      Math.max(margin.Top, currentY - tooltipHeight - TOOLTIP_MARGIN),
      0,
    ];
  };

  const transform = calculatedPosition();

  return (
    <div
      id={id}
      className={styles.Container}
      style={{
        top: 0,
        left: 0,
        transform: `translate3d(${transform[0]}px, ${transform[1]}px, ${transform[2]}px)`,
        transition: 'transform 0.2s',
      }}
      ref={tooltipRef}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

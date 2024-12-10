import {clamp} from '@shopify/polaris-viz-core';

import type {AlteredPositionProps} from '../types';

const VERTICAL_MARGIN = 35;
const HORIZONTAL_MARGIN = 20;
const SCROLLBAR_WIDTH = 20;

export interface AlteredPositionReturn {
  x: number;
  y: number;
}

export type AlteredPosition = (
  props: AlteredPositionProps,
) => AlteredPositionReturn;

export function getAlteredLineChartPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  const {
    currentX,
    currentY,
    containerBounds,
    tooltipDimensions,
    scrollContainer,
  } = props;

  let x = currentX;
  let y = currentY;

  // Center the tooltip horizontally over the point
  x -= tooltipDimensions.width / 2;

  // Position tooltip above the point with increased margin
  if (props.isPerformanceImpacted) {
    y = containerBounds.y - (scrollContainer?.scrollTop ?? 0);
  } else {
    y = y - tooltipDimensions.height - VERTICAL_MARGIN;
  }

  // Clamp the position to keep tooltip within viewport
  return {
    x: clamp({
      amount: x,
      min: HORIZONTAL_MARGIN,
      max:
        window.innerWidth -
        tooltipDimensions.width -
        HORIZONTAL_MARGIN -
        SCROLLBAR_WIDTH,
    }),
    y: clamp({
      amount: y,
      min: window.scrollY + HORIZONTAL_MARGIN,
      max:
        window.scrollY +
        window.innerHeight -
        tooltipDimensions.height -
        HORIZONTAL_MARGIN,
    }),
  };
}

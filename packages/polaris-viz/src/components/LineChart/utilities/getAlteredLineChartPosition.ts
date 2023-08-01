import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import type {TooltipPositionOffset} from '../../TooltipWrapper';
import type {Margin} from '../../../types';

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 20;

export interface AlteredPositionProps {
  bandwidth: number;
  chartBounds: BoundingRect;
  currentX: number;
  currentY: number;
  isPerformanceImpacted: boolean;
  margin: Margin;
  position: TooltipPositionOffset;
  tooltipDimensions: Dimensions;
}

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
  const {currentX, currentY, chartBounds} = props;

  const x = currentX + TOOLTIP_MARGIN;
  let y = currentY;

  if (props.isPerformanceImpacted) {
    y = 0;
  }

  return {
    x: clamp({
      amount: x,
      min: (chartBounds.x ?? 0) + TOOLTIP_MARGIN,
      max:
        window.innerWidth - props.tooltipDimensions.width - TOOLTIP_MARGIN * 2,
    }),
    y: clamp({
      amount: y,
      min: window.scrollY + TOOLTIP_MARGIN,
      max:
        window.scrollY +
        window.innerHeight -
        props.tooltipDimensions.height -
        TOOLTIP_MARGIN,
    }),
  };
}

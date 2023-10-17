import type {Dimensions} from '@shopify/polaris-viz-core';

import type {TooltipPositionOffset} from '../../TooltipWrapper';
import type {Margin} from '../../../types';

// The space between the cursor and the tooltip
const TOOLTIP_MARGIN = 20;

export interface AlteredPositionProps {
  bandwidth: number;
  chartBounds: {x: number; y: number; width: number; height: number};
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

export function getAlteredStackedAreaChartPosition({
  currentX,
  currentY,
  chartBounds,
  margin,
  tooltipDimensions,
}: AlteredPositionProps): AlteredPositionReturn {
  const x = Math.min(
    Math.max(currentX, TOOLTIP_MARGIN),
    chartBounds.width - tooltipDimensions.width - TOOLTIP_MARGIN,
  );

  // Y POSITIONING
  // If y is below the chart, adjust the tooltip position to the bottom of the chart
  //

  const y =
    currentY >= chartBounds.y + chartBounds.height
      ? chartBounds.height -
        tooltipDimensions.height -
        TOOLTIP_MARGIN -
        margin.Bottom
      : currentY;

  return {x, y};
}

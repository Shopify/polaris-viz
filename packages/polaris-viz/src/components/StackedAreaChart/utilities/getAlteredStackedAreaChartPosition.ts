import type {Dimensions} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import {getRightPosition} from '../../../components/TooltipWrapper';
import type {TooltipPositionOffset} from '../../TooltipWrapper';
import type {Margin} from '../../../types';

// The space between the cursor and the tooltip
const TOOLTIP_MARGIN = 20;
const SCROLLBAR_WIDTH = 20;

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

export function getAlteredStackedAreaChartPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  const {currentX, currentY, chartBounds, margin, tooltipDimensions} = props;

  let x = currentX;
  let y = currentY;

  // Y POSITIONING
  // If y is below the chart, adjust the tooltip position to the bottom of the chart
  //
  y =
    currentY >= chartBounds.y + chartBounds.height
      ? chartBounds.height -
        tooltipDimensions.height -
        TOOLTIP_MARGIN -
        margin.Bottom
      : currentY;

  // X POSITIONING
  const right = getRightPosition(x, props);
  x = right.value;

  if (right.wasOutsideBounds) {
    const left = getLeftPosition(x);
    x = left.value;
  }

  return {
    x: clamp({
      amount: x,
      min: TOOLTIP_MARGIN,
      max:
        window.innerWidth -
        props.tooltipDimensions.width -
        TOOLTIP_MARGIN -
        SCROLLBAR_WIDTH,
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

function getLeftPosition(value: number): {
  value: number;
  wasOutsideBounds: boolean;
} {
  return {value: value - TOOLTIP_MARGIN, wasOutsideBounds: false};
}

import {clamp} from '@shopify/polaris-viz-core';

import {TooltipHorizontalOffset, TooltipVerticalOffset} from '../types';
import type {AlteredPositionProps, AlteredPositionReturn} from '../types';
import {
  getAbovePosition,
  getBelowPosition,
  getCenterPosition,
  getInlinePosition,
  getLeftPosition,
  getRightPosition,
  getVerticalCenterPosition,
} from '../utilities';
import {TOOLTIP_MARGIN, SCROLLBAR_WIDTH} from '../constants';

// Keep the tooltip within the bounds of the chart.
// Based on "position" the tooltip will be placed
// around the chart item so the item should never
// be obscured by the tooltip.
export function getAlteredVerticalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  const {currentX, currentY, position, scrollContainer} = props;

  const newPosition = {...position};

  let x = currentX;
  let y = currentY - (scrollContainer?.scrollTop ?? 0);

  //
  // Y POSITIONING
  //
  if (!props.isPerformanceImpacted) {
    if (newPosition.vertical === TooltipVerticalOffset.Inline) {
      newPosition.horizontal = TooltipHorizontalOffset.Left;

      const inline = getInlinePosition(y, props);
      y = inline.value;
    }

    if (newPosition.vertical === TooltipVerticalOffset.Center) {
      const verticalCenter = getVerticalCenterPosition(y, props);
      y = verticalCenter.value;
    }

    if (newPosition.vertical === TooltipVerticalOffset.Above) {
      const above = getAbovePosition(y, props);
      y = above.value;

      if (above.wasOutsideBounds) {
        newPosition.horizontal = TooltipHorizontalOffset.Left;
      }
    }

    if (newPosition.vertical === TooltipVerticalOffset.Below) {
      const below = getBelowPosition(y, props);
      y = below.value;

      if (below.wasOutsideBounds) {
        newPosition.horizontal = TooltipHorizontalOffset.Left;
      }
    }
  } else {
    y = clamp({
      amount:
        (props.chartBounds.y ?? 0) -
        props.tooltipDimensions.height -
        (scrollContainer?.scrollTop ?? 0),
      min: 0,
      max:
        window.scrollY +
        window.innerHeight -
        props.tooltipDimensions.height -
        TOOLTIP_MARGIN,
    });
  }

  //
  // X POSITIONING
  //

  if (newPosition.horizontal === TooltipHorizontalOffset.Left) {
    const left = getLeftPosition(x, props);

    if (left.wasOutsideBounds) {
      newPosition.horizontal = TooltipHorizontalOffset.Right;
    } else {
      x = left.value;
    }
  }

  if (newPosition.horizontal === TooltipHorizontalOffset.Right) {
    const right = getRightPosition(x, props);
    x = right.value;
  }

  if (newPosition.horizontal === TooltipHorizontalOffset.Center) {
    const center = getCenterPosition(x, props);
    x = center.value;
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

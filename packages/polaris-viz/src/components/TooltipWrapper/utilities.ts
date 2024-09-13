import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import type {TooltipPositionOffset} from '../TooltipWrapper';
import type {Margin} from '../../types';

import {TooltipHorizontalOffset, TooltipVerticalOffset} from './types';

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 20;
export const SCROLLBAR_WIDTH = 20;

export interface AlteredPositionProps {
  bandwidth: number;
  chartBounds: BoundingRect;
  currentX: number;
  currentY: number;
  isPerformanceImpacted: boolean;
  margin: Margin;
  position: TooltipPositionOffset;
  tooltipDimensions: Dimensions;
  chartDimensions?: BoundingRect;
  scrollContainer?: Element | null;
}

export interface AlteredPositionReturn {
  x: number;
  y: number;
}

export type AlteredPosition = (
  props: AlteredPositionProps,
) => AlteredPositionReturn;

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
        (props.chartDimensions?.y ?? 0) -
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

interface IsOutsideBoundsData {
  current: number;
  direction: 'x' | 'y';
  alteredPosition: AlteredPositionProps;
}

function isOutsideBounds(data: IsOutsideBoundsData): boolean {
  const {current, direction, alteredPosition} = data;

  if (direction === 'x') {
    const isLeft = current < 0;
    const isRight =
      current + alteredPosition.tooltipDimensions.width > window.innerWidth;

    return isLeft || isRight;
  } else {
    const isAbove = current < window.scrollY;
    const isBelow =
      current + alteredPosition.tooltipDimensions.height >
      window.scrollY +
        window.innerHeight -
        alteredPosition.tooltipDimensions.height;

    return isAbove || isBelow;
  }
}

type getFunction = (
  value: number,
  props: AlteredPositionProps,
) => {value: number; wasOutsideBounds: boolean};

export function getInlinePosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let y = value;
  const wasOutsideBounds = isOutsideBounds({
    current: y,
    direction: 'y',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    const bottom = y + props.tooltipDimensions.height;
    const offset = bottom - props.chartBounds.height;

    y -= offset + props.margin.Bottom;
  }

  return {value: y, wasOutsideBounds};
}

export function getVerticalCenterPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let y = value - props.tooltipDimensions.height / 2;
  const wasOutsideBounds = isOutsideBounds({
    current: y,
    direction: 'y',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    if (y <= 0) {
      y = 0;
    } else {
      y = props.chartBounds.height - props.tooltipDimensions.height;
    }
  }

  return {value: y, wasOutsideBounds};
}

export function getAbovePosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let y = value - props.tooltipDimensions.height - TOOLTIP_MARGIN;
  const wasOutsideBounds = isOutsideBounds({
    current: y,
    direction: 'y',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    y = props.currentY;
  }

  return {value: y, wasOutsideBounds};
}

export function getBelowPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let y = value + TOOLTIP_MARGIN * 2;
  const wasOutsideBounds = isOutsideBounds({
    current: y,
    direction: 'y',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    y -= props.tooltipDimensions.height + TOOLTIP_MARGIN;
  }

  return {value: y, wasOutsideBounds};
}

export function getLeftPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let x = value - props.tooltipDimensions.width;
  const wasOutsideBounds = isOutsideBounds({
    current: x,
    direction: 'x',
    alteredPosition: props,
  });
  if (wasOutsideBounds) {
    x = props.currentX + props.margin.Left + props.bandwidth + TOOLTIP_MARGIN;
  } else {
    x -= TOOLTIP_MARGIN;
  }

  return {value: x, wasOutsideBounds};
}

export function getRightPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let x = value + props.bandwidth;
  const wasOutsideBounds = isOutsideBounds({
    current: x,
    direction: 'x',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    x -= props.tooltipDimensions.width + props.bandwidth + TOOLTIP_MARGIN;
  } else {
    x += TOOLTIP_MARGIN;
  }

  return {value: x, wasOutsideBounds};
}

export function getCenterPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  const offset = props.bandwidth - props.tooltipDimensions.width;
  let x = value + offset / 2;

  if (x < props.margin.Left) {
    x = props.currentX + props.margin.Left;
  }

  const wasOutsideBounds = isOutsideBounds({
    current: x,
    direction: 'x',
    alteredPosition: props,
  });

  if (wasOutsideBounds) {
    x =
      props.chartBounds.width -
      props.tooltipDimensions.width -
      TOOLTIP_MARGIN * 2;
  }

  return {value: x, wasOutsideBounds};
}

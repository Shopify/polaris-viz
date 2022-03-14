import type {Dimensions} from '@shopify/polaris-viz-core';

import type {TooltipPositionOffset} from '../TooltipWrapper';
import type {Margin} from '../../types';

import {TooltipHorizontalOffset, TooltipVerticalOffset} from './types';

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 10;

export interface AlteredPositionProps {
  currentX: number;
  currentY: number;
  position: TooltipPositionOffset;
  tooltipDimensions: Dimensions;
  chartDimensions: Dimensions;
  margin: Margin;
  bandwidth: number;
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
  const {currentX, currentY, position} = props;

  const newPosition = {...position};

  let x = currentX;
  let y = currentY;

  //
  // Y POSITIONING
  //

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

  return {x, y};
}

interface IsOutsideBoundsData {
  current: number;
  direction: 'x' | 'y';
  alteredPosition: AlteredPositionProps;
}

function isOutsideBounds(data: IsOutsideBoundsData): boolean {
  const {current, direction, alteredPosition} = data;

  if (direction === 'x') {
    const isLeft = current < alteredPosition.margin.Left;
    const isRight =
      current + alteredPosition.tooltipDimensions.width >
      alteredPosition.chartDimensions.width - alteredPosition.margin.Right;

    return isLeft || isRight;
  } else {
    const isAbove = current < 0;
    const isBelow =
      current + alteredPosition.tooltipDimensions.height >
      alteredPosition.chartDimensions.height - alteredPosition.margin.Bottom;

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
    const offset = bottom - props.chartDimensions.height;

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
      y = props.chartDimensions.height - props.tooltipDimensions.height;
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
      props.chartDimensions.width -
      props.tooltipDimensions.width -
      TOOLTIP_MARGIN * 2;
  }

  return {value: x, wasOutsideBounds};
}

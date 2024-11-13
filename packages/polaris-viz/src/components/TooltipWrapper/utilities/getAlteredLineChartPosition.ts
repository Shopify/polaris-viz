import {clamp} from '@shopify/polaris-viz-core';

import type {AlteredPositionProps} from '../types';

// The space between the cursor and the tooltip
export const TOOLTIP_MARGIN = 20;
export const SCROLLBAR_WIDTH = 20;

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
  const {currentX, currentY, chartBounds, scrollContainer} = props;

  let x = currentX;
  let y = currentY;

  //
  // Y POSITIONING
  //

  if (props.isPerformanceImpacted || props.isTouchDevice) {
    y = chartBounds.y - (scrollContainer?.scrollTop ?? 0) ?? 0;

    if (props.isTouchDevice) {
      y -= props.tooltipDimensions.height;
    }
  }

  //
  // X POSITIONING
  //

  const right = getRightPosition(x, props);

  x = right.value;

  if (right.wasOutsideBounds) {
    const left = getLeftPosition(x, props);

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

interface IsOutsideBoundsData {
  current: number;
  alteredPosition: AlteredPositionProps;
}

function isOutsideBounds(data: IsOutsideBoundsData) {
  const {current, alteredPosition} = data;

  const min = TOOLTIP_MARGIN;
  const max = window.innerWidth - TOOLTIP_MARGIN - SCROLLBAR_WIDTH;

  const isLeft = current < min;
  const isRight = current + alteredPosition.tooltipDimensions.width > max;

  return {left: isLeft, right: isRight};
}

type getFunction = (
  value: number,
  props: AlteredPositionProps,
) => {value: number; wasOutsideBounds: boolean};

function getLeftPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value] = args;

  return {value: value - TOOLTIP_MARGIN, wasOutsideBounds: false};
}

function getRightPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let x = value + props.bandwidth;
  const wasOutsideBounds = isOutsideBounds({
    current: x,
    alteredPosition: props,
  });

  if (wasOutsideBounds.right) {
    x -= props.tooltipDimensions.width + props.bandwidth + TOOLTIP_MARGIN;
  } else {
    x += TOOLTIP_MARGIN;
  }

  return {value: x, wasOutsideBounds: wasOutsideBounds.right};
}

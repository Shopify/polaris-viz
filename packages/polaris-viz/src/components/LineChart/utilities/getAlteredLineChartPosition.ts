import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import type {TooltipPositionOffset} from '../../TooltipWrapper';
import type {Margin} from '../../../types';
import {TooltipHorizontalOffset} from '../../TooltipWrapper';

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
  const {currentX, currentY, position, chartBounds} = props;

  const newPosition = {...position};

  let x = currentX;
  let y = currentY;

  //
  // Y POSITIONING
  //

  if (props.isPerformanceImpacted) {
    y = 0;
  }

  //
  // X POSITIONING
  //

  const left = getLeftPosition(x, props);

  if (left.wasOutsideBounds) {
    newPosition.horizontal = TooltipHorizontalOffset.Right;
  } else {
    x = left.value;
  }

  if (newPosition.horizontal === TooltipHorizontalOffset.Right) {
    const right = getRightPosition(x, props);
    x = right.value;
  }

  return {
    x: clamp({
      amount: x,
      min: chartBounds.x ?? 0,
      max: chartBounds.width,
    }),
    y: clamp({
      amount: y,
      min: chartBounds.y ?? 0,
      max: chartBounds.height - props.tooltipDimensions.height,
    }),
  };
}

interface IsOutsideBoundsData {
  current: number;
  alteredPosition: AlteredPositionProps;
}

function isOutsideBounds(data: IsOutsideBoundsData) {
  const {current, alteredPosition} = data;

  const isLeft =
    current <
    alteredPosition.margin.Left + alteredPosition.tooltipDimensions.width;
  const isRight =
    current + alteredPosition.tooltipDimensions.width >
    alteredPosition.chartBounds.width - alteredPosition.margin.Right;

  return {left: isLeft, right: isRight};
}

type getFunction = (
  value: number,
  props: AlteredPositionProps,
) => {value: number; wasOutsideBounds: boolean};

function getLeftPosition(
  ...args: Parameters<getFunction>
): ReturnType<getFunction> {
  const [value, props] = args;

  let x = value - props.tooltipDimensions.width;
  const wasOutsideBounds = isOutsideBounds({
    current: x,
    alteredPosition: props,
  });

  if (wasOutsideBounds.left) {
    x = props.currentX + props.margin.Left + props.bandwidth + TOOLTIP_MARGIN;
  } else {
    x -= TOOLTIP_MARGIN;
  }

  return {value: x, wasOutsideBounds: wasOutsideBounds.left};
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

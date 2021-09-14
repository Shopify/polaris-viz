import type {Dimensions, Margin} from '../../types';

import type {TooltipPosition} from './TooltipContainer';

// The space between the cursor and the tooltip
const TOOLTIP_MARGIN = 10;

interface AlteredPositionProps {
  currentX: number;
  currentY: number;
  position: TooltipPosition;
  tooltipDimensions: Dimensions;
  chartDimensions: Dimensions;
  margin: Margin;
  bandwidth: number;
}

interface AlteredPositionReturn {
  x: number;
  y: number;
}

// Keep the tooltip within the bounds of the chart.
// Based on "position" the tooltip will be placed
// around the chart item so the item should never
// be obscured by the tooltip.
export function getAlteredPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  const {currentX, currentY, position} = props;

  const newPosition = {...position};

  let x = currentX;
  let y = currentY;

  //
  // Y POSITIONING
  //

  if (newPosition.vertical === 'inline') {
    newPosition.horizontal = 'left';

    const inline = getInlinePosition(y, props);
    y = inline.value;
  }

  if (newPosition.vertical === 'center') {
    const verticalCenter = getVerticalCenterPosition(y, props);
    y = verticalCenter.value;
  }

  if (newPosition.vertical === 'above') {
    const above = getAbovePosition(y, props);
    y = above.value;

    if (above.wasOutsideBounds) {
      newPosition.horizontal = 'left';
    }
  }

  if (newPosition.vertical === 'below') {
    const below = getBelowPosition(y, props);
    y = below.value;

    if (below.wasOutsideBounds) {
      newPosition.horizontal = 'left';
    }
  }

  //
  // X POSITIONING
  //

  if (newPosition.horizontal === 'left') {
    const left = getLeftPosition(x, props);
    x = left.value;
  }

  if (newPosition.horizontal === 'right') {
    const right = getRightPosition(x, props);
    x = right.value;
  }

  if (newPosition.horizontal === 'center') {
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
    y = props.currentY;
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

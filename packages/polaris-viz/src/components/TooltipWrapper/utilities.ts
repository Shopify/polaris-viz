import {TOOLTIP_MARGIN} from './constants';
import type {AlteredPositionProps} from './types';

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
      y = window.scrollY + window.innerHeight - props.tooltipDimensions.height;
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
    y = props.currentY - (props.scrollContainer?.scrollTop ?? 0);
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
    x = window.innerWidth - props.tooltipDimensions.width - TOOLTIP_MARGIN * 2;
  }

  return {value: x, wasOutsideBounds};
}

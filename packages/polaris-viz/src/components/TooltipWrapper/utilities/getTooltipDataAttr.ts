import type {BoundingRect} from '@shopify/polaris-viz-core';

const TOOLTIP_DATA_ATTRS = {
  index: 'tooltip-index',
  x: 'tooltip-x',
  y: 'tooltip-y',
  seriesBounds: 'tooltip-series-bounds',
};

export interface TooltipAttrData {
  index: number;
  x?: number;
  y?: number;
  seriesBounds?: BoundingRect;
}

export function getTooltipDataAttr({
  index,
  x,
  y,
  seriesBounds,
}: TooltipAttrData) {
  return {
    'data-tooltip': true,
    [`data-${TOOLTIP_DATA_ATTRS.index}`]: index,
    [`data-${TOOLTIP_DATA_ATTRS.x}`]: x,
    [`data-${TOOLTIP_DATA_ATTRS.y}`]: y,
    [`data-${TOOLTIP_DATA_ATTRS.seriesBounds}`]: seriesBounds
      ? JSON.stringify(seriesBounds)
      : undefined,

    // Just for debugging
    fill: 'rgba(255, 0, 0, 0.25)',
    stroke: 'blue',
  };
}

export function getTooltipDataFromElement(
  element: HTMLElement | SVGSVGElement,
) {
  const originalX = element.dataset[toCamelCase(TOOLTIP_DATA_ATTRS.x)];
  const originalY = element.dataset[toCamelCase(TOOLTIP_DATA_ATTRS.y)];

  const x = originalX == null ? null : Number(originalX);
  const y = originalY == null ? null : Number(originalY);

  const seriesBounds = getSeriesBoundsFromElement(element);
  const activeIndex = element.dataset[toCamelCase(TOOLTIP_DATA_ATTRS.index)];

  return {
    x,
    y,
    activeIndex: activeIndex == null ? -1 : Number(activeIndex),
    seriesBounds,
  };
}

function getSeriesBoundsFromElement(
  element: HTMLElement | SVGSVGElement,
): BoundingRect | null {
  const seriesBoundsAttr =
    element.dataset[toCamelCase(TOOLTIP_DATA_ATTRS.seriesBounds)];

  if (seriesBoundsAttr == null) {
    return null;
  }

  const seriesBounds = JSON.parse(seriesBoundsAttr);

  if (isSeriesBoundsValid(seriesBounds)) {
    return seriesBounds;
  }

  return null;
}

function isSeriesBoundsValid(seriesBounds: unknown): boolean {
  return (
    Object.prototype.hasOwnProperty.call(seriesBounds, 'x') &&
    Object.prototype.hasOwnProperty.call(seriesBounds, 'y') &&
    Object.prototype.hasOwnProperty.call(seriesBounds, 'height') &&
    Object.prototype.hasOwnProperty.call(seriesBounds, 'width')
  );
}

function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

import type {BoundingRect} from '@shopify/polaris-viz-core';

import type {TooltipPositionParams} from '../types';
import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../constants';

import {eventPointNative, getXYFromEventType} from './eventPoint';

interface Props
  extends Pick<TooltipPositionParams, 'event' | 'eventType' | 'index'> {
  containerBounds: BoundingRect;
  parentElement: SVGSVGElement | null;
}

export function getDonutChartTooltipPosition({
  containerBounds,
  event,
  eventType,
  index,
  parentElement,
}: Props) {
  if (index == null) {
    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }

  if (
    eventType === 'mouse' &&
    (event instanceof MouseEvent || event instanceof TouchEvent)
  ) {
    if (index == null || event == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const point = eventPointNative(event!);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {x, y} = getXYFromEventType(event);

    return {
      x,
      y,
      activeIndex: index,
    };
  } else {
    if (event?.target == null || parentElement == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const parentWidth = parentElement.clientWidth;

    const startAngle = (event.target as SVGElement).getAttribute(
      'data-start-angle',
    );
    const endAngle = (event.target as SVGElement).getAttribute(
      'data-end-angle',
    );

    const leftOffset = containerBounds.width - parentWidth;

    const radius =
      Math.min(containerBounds.width - leftOffset, containerBounds.height) / 2;

    const centerX = containerBounds.x + leftOffset + radius;
    const centerY = containerBounds.y + containerBounds.height / 2;

    const midAngle = (Number(startAngle) + Number(endAngle)) / 2;

    const x = centerX + radius * Math.cos(midAngle - Math.PI / 2);
    const y = centerY + radius * Math.sin(midAngle - Math.PI / 2);

    return {
      x,
      y,
      activeIndex: index,
    };
  }
}

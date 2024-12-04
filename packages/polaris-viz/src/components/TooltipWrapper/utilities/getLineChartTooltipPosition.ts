import type {BoundingRect} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import type {TooltipPositionParams} from '../types';
import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../constants';

import {getXYFromEventType, eventPointNative} from './eventPoint';

interface Props extends Omit<TooltipPositionParams, 'xScale'> {
  containerBounds: BoundingRect;
  scrollY: number;
  xScale: ScaleLinear<number, number>;
}

export function getLineChartTooltipPosition({
  containerBounds,
  chartBounds,
  data,
  event,
  eventType,
  index,
  longestSeriesIndex,
  scrollY,
  xScale,
}: Props) {
  if (eventType === 'mouse') {
    if (event == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const point = eventPointNative(event);

    if (point == null || xScale == null || data[longestSeriesIndex] == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgX} = point;

    const closestIndex = Math.round(xScale.invert(svgX - chartBounds.x));

    const activeIndex = clamp({
      amount: closestIndex,
      min: 0,
      max: data[longestSeriesIndex].data.length - 1,
    });

    const {x, y} = getXYFromEventType(event);

    return {
      x,
      y,
      activeIndex,
    };
  } else {
    const activeIndex = index ?? 0;

    const x = xScale?.(activeIndex) ?? 0;

    return {
      x: x + containerBounds.x,
      y: containerBounds.y - scrollY,
      activeIndex,
    };
  }
}

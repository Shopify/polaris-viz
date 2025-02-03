import type {ScaleLinear} from 'd3-scale';
import type {BoundingRect} from '@shopify/polaris-viz-core';

import {getStackedValuesFromDataSeries} from '../../../utilities/getStackedValuesFromDataSeries';
import type {TooltipPosition, TooltipPositionParams} from '../types';
import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../constants';

import {eventPointNative} from './eventPoint';

const SPACING = 10;

interface Props extends Omit<TooltipPositionParams, 'xScale'> {
  bandwidth: number;
  containerBounds: BoundingRect;
  highestValueForSeries: number[];
  scrollY: number;
  xScale: ScaleLinear<number, number>;
}

export function getHorizontalBarChartTooltipPosition({
  containerBounds,
  data,
  event,
  eventType,
  index,
  longestSeriesIndex,
  type,
  xScale,
  scrollY,
  highestValueForSeries,
  bandwidth,
}: Props): TooltipPosition {
  const groupHeight = bandwidth;

  const isStacked = type === 'stacked';

  if (eventType === 'mouse' && event) {
    const point = eventPointNative(event);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgY} = point;

    const currentPoint = svgY - scrollY;
    const currentIndex = Math.floor(currentPoint / groupHeight);

    if (
      currentIndex < 0 ||
      currentIndex > data[longestSeriesIndex].data.length - 1
    ) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    return formatPositionForTooltip(currentIndex, containerBounds);
  } else if (index != null) {
    return formatPositionForTooltip(index, containerBounds);
  }

  return TOOLTIP_POSITION_DEFAULT_RETURN;

  function formatPositionForTooltip(
    index: number,
    containerBounds: BoundingRect,
  ): TooltipPosition {
    if (isStacked) {
      const {formattedStackedValues} = getStackedValuesFromDataSeries(data);

      const x = formattedStackedValues[index].reduce((prev, cur) => {
        const [start, end] = cur;

        if (start < 0) {
          return prev;
        }

        return prev + (xScale(end) - xScale(start));
      }, xScale(0));

      return {
        x: containerBounds.x + x,
        y: containerBounds.y + groupHeight * index,
        activeIndex: index,
      };
    }

    const highestValue = highestValueForSeries[index] ?? 0;
    const x = containerBounds.x + (xScale(highestValue ?? 0) ?? 0) + SPACING;

    return {
      x: highestValue < 0 ? -x : x,
      y: containerBounds.y + groupHeight * index,
      activeIndex: index,
    };
  }
}

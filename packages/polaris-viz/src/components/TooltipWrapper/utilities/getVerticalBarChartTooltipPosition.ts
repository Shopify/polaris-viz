import type {ScaleBand, ScaleLinear} from 'd3-scale';
import type {BoundingRect, DataSeries} from '@shopify/polaris-viz-core';

import {sortBarChartData} from '../../VerticalBarChart';
import type {TooltipPosition, TooltipPositionParams} from '../types';
import {TooltipHorizontalOffset, TooltipVerticalOffset} from '../types';
import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../constants';

import {eventPointNative} from './eventPoint';

interface Props extends Omit<TooltipPositionParams, 'xScale'> {
  containerBounds: BoundingRect;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
}

export function getVerticalBarChartTooltipPosition({
  chartBounds,
  containerBounds,
  data,
  event,
  eventType,
  index,
  longestSeriesIndex,
  type,
  xScale,
  yScale,
}: Props): TooltipPosition {
  const isStacked = type === 'stacked';

  if (
    eventType === 'mouse' &&
    (event instanceof MouseEvent || event instanceof TouchEvent)
  ) {
    const point = eventPointNative(event);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgX} = point;

    const currentPoint = svgX - chartBounds.x;
    const activeIndex = Math.floor(currentPoint / xScale.step());

    if (
      activeIndex < 0 ||
      activeIndex > data[longestSeriesIndex].data.length - 1
    ) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    return formatPositionForTooltip({
      chartBounds,
      containerBounds,
      index: activeIndex,
      xScale,
      yScale,
      data,
      isStacked,
    });
  } else if (index != null) {
    return formatPositionForTooltip({
      chartBounds,
      containerBounds,
      index,
      xScale,
      yScale,
      data,
      isStacked,
    });
  }

  return TOOLTIP_POSITION_DEFAULT_RETURN;
}

function formatPositionForTooltip({
  chartBounds,
  containerBounds,
  data,
  index,
  xScale,
  yScale,
  isStacked,
}: {
  chartBounds: BoundingRect;
  containerBounds: BoundingRect;
  data: DataSeries[];
  index: number | null;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  isStacked: boolean;
}): TooltipPosition {
  if (index == null) {
    return TOOLTIP_POSITION_DEFAULT_RETURN;
  }

  const xPosition = xScale(`${index}`) ?? 0;

  const highestValue = getHighestValue(data, index);

  const x = containerBounds.x + xPosition;
  const y = yScale(highestValue < 0 ? 0 : highestValue) + containerBounds.y;

  return {
    x: chartBounds.x + x,
    y: Math.abs(y),
    position: {
      horizontal: TooltipHorizontalOffset.Center,
      vertical: TooltipVerticalOffset.Above,
    },
    activeIndex: index,
  };

  function getHighestValue(data: DataSeries[], index: number): number {
    if (isStacked) {
      const sortedData = sortBarChartData(data);

      return sortedData[index].reduce(sumPositiveData, 0) ?? 0;
    }

    const values = data
      .map((series) => series.data[index].value)
      .filter(Boolean) as number[];

    return Math.max(...values);
  }
}

function sumPositiveData(prevValue: number, currValue: number) {
  return currValue < 0 ? prevValue : prevValue + currValue;
}

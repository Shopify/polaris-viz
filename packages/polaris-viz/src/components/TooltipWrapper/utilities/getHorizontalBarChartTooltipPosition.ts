import type {ScaleLinear} from 'd3-scale';

import {getStackedValuesFromDataSeries} from '../../../utilities/getStackedValuesFromDataSeries';
import type {TooltipPosition, TooltipPositionParams} from '../types';
import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../constants';

import {eventPointNative} from './eventPoint';

interface Props extends Omit<TooltipPositionParams, 'xScale'> {
  xScale: ScaleLinear<number, number>;
}

export function getHorizontalBarChartTooltipPosition({
  chartBounds,
  data,
  event,
  eventType,
  index,
  longestSeriesIndex,
  type,
  xScale,
}: Props): TooltipPosition {
  const groupHeight = chartBounds.height / data[longestSeriesIndex].data.length;
  const isStacked = type === 'stacked';

  if (eventType === 'mouse' && event) {
    const point = eventPointNative(event);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgY} = point;

    const currentPoint = svgY - 0;
    const currentIndex = Math.floor(currentPoint / groupHeight);

    if (
      currentIndex < 0 ||
      currentIndex > data[longestSeriesIndex].data.length - 1
    ) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    return formatPositionForTooltip(currentIndex);
  } else if (index != null) {
    return formatPositionForTooltip(index);
  }

  return TOOLTIP_POSITION_DEFAULT_RETURN;

  function formatPositionForTooltip(index: number): TooltipPosition {
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
        x: chartBounds.x + x,
        y: chartBounds.y + groupHeight * index,
        activeIndex: index,
      };
    }

    const highestValue = data[longestSeriesIndex].data[index].value ?? 0;
    const x = chartBounds.x + (xScale(highestValue ?? 0) ?? 0);

    return {
      x: highestValue < 0 ? -x : x,
      y: groupHeight * index,
      activeIndex: index,
    };
  }
}

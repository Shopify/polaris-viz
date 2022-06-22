import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../components/';
import type {TooltipPosition, TooltipPositionParams} from '../components';

import {eventPointNative} from './eventPoint';

interface Props {
  tooltipPosition: TooltipPositionParams;
  chartXPosition: number;
  step: number;
  maxIndex: number;
  yMin: number;
  yMax: number;
  formatPositionForTooltip: (index: number) => TooltipPosition;
}

export function getVerticalBarChartTooltipPosition({
  chartXPosition,
  formatPositionForTooltip,
  maxIndex,
  step,
  tooltipPosition,
  yMax,
  yMin,
}: Props): TooltipPosition {
  const {event, index, eventType} = tooltipPosition;

  if (eventType === 'mouse' && event) {
    const point = eventPointNative(event);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgX, svgY} = point;
    const currentPoint = svgX - chartXPosition;
    const activeIndex = Math.floor(currentPoint / step);

    if (
      activeIndex < 0 ||
      activeIndex > maxIndex ||
      svgY <= yMin ||
      svgY > yMax
    ) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    return formatPositionForTooltip(activeIndex);
  } else if (index != null) {
    return formatPositionForTooltip(index);
  }

  return TOOLTIP_POSITION_DEFAULT_RETURN;
}

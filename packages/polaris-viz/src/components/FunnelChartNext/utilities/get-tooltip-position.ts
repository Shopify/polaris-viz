import type {
  TooltipPosition,
  TooltipPositionParams,
} from 'components/TooltipWrapper';

import {TOOLTIP_POSITION_DEFAULT_RETURN} from '../../TooltipWrapper';
import {eventPointNative} from '../../../utilities';

interface Props {
  tooltipPosition: TooltipPositionParams;
  step: number;
  maxIndex: number;
  yMax: number;
  formatPositionForTooltip: (index: number) => TooltipPosition;
}

export function getTooltipPosition({
  formatPositionForTooltip,
  maxIndex,
  step,
  tooltipPosition,
  yMax,
}: Props): TooltipPosition {
  const {event, index, eventType} = tooltipPosition;

  if (eventType === 'mouse' && event) {
    const point = eventPointNative(event);

    if (point == null) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    const {svgX, svgY} = point;

    const activeIndex = Math.floor(svgX / step);

    if (activeIndex < 0 || activeIndex > maxIndex || svgY <= 0 || svgY > yMax) {
      return TOOLTIP_POSITION_DEFAULT_RETURN;
    }

    return formatPositionForTooltip(activeIndex);
  } else if (index != null) {
    return formatPositionForTooltip(index);
  }

  return TOOLTIP_POSITION_DEFAULT_RETURN;
}

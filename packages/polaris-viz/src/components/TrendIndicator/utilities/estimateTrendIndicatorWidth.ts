import {estimateStringWidthWithOffset} from '../../../utilities';
import {
  FONT_SIZE,
  FONT_WEIGHT,
  ICON_SIZE,
  NO_VALUE_WIDTH,
  TEXT_ICON_SPACING,
} from '../constants';

export function estimateTrendIndicatorWidth(value?: string) {
  const textWidth = value
    ? estimateStringWidthWithOffset(value, FONT_SIZE, FONT_WEIGHT)
    : NO_VALUE_WIDTH;
  const totalWidth = Math.round(ICON_SIZE + TEXT_ICON_SPACING + textWidth);

  return {totalWidth, textWidth};
}

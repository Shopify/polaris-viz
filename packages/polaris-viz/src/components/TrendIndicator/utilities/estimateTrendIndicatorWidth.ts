import {estimateStringWidthWithOffset} from '../../../utilities';
import {
  FONT_SIZE,
  FONT_WEIGHT,
  ICON_SIZE,
  NO_VALUE_WIDTH,
  TEXT_ICON_SPACING,
} from '../constants';

export function estimateTrendIndicatorWidth(
  value,
  fontWeight: number = FONT_WEIGHT,
) {
  const textWidth = value
    ? estimateStringWidthWithOffset(value, FONT_SIZE, fontWeight)
    : NO_VALUE_WIDTH;
  const totalWidth = Math.round(ICON_SIZE + TEXT_ICON_SPACING + textWidth);

  return {totalWidth, textWidth};
}

import {estimateStringWidthWithOffset} from '../../../utilities';
import {
  FONT_SIZE,
  FONT_WEIGHT,
  ICON_SIZE,
  TEXT_ICON_SPACING,
} from '../constants';

export function estimateTrendIndicatorWidth(value) {
  const textWidth = estimateStringWidthWithOffset(
    value,
    FONT_SIZE,
    FONT_WEIGHT,
  );
  const totalWidth = Math.round(ICON_SIZE + TEXT_ICON_SPACING + textWidth);

  return {totalWidth, textWidth};
}

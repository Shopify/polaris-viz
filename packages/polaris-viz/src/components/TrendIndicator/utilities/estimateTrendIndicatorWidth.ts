import {estimateStringWidthWithOffset} from '../../../utilities/estimateStringWidthWithOffset';
import {ICON_SIZE, NO_VALUE_WIDTH, TEXT_ICON_SPACING} from '../constants';

export function estimateTrendIndicatorWidth(
  value: string,
  fontSize: number,
  fontWeight: number,
) {
  const textWidth = value
    ? estimateStringWidthWithOffset(value, fontSize, fontWeight)
    : NO_VALUE_WIDTH;
  const totalWidth = Math.round(ICON_SIZE + TEXT_ICON_SPACING + textWidth);

  return {totalWidth, textWidth};
}

import {
  estimateStringWidth,
  FONT_SIZE,
  FONT_WEIGHT,
} from '@shopify/polaris-viz-core';

import characterWidths from '../data/character-widths.json';
import characterWidthOffsets from '../data/character-width-offsets.json';

export function estimateStringWidthWithOffset(
  string: string,
  fontSize: number = FONT_SIZE,
  fontWeight: number = FONT_WEIGHT,
) {
  const width = estimateStringWidth(string, characterWidths);

  const fontSizeOffset = characterWidthOffsets.fontSize[fontSize] ?? 1;
  const fontWeightOffset = characterWidthOffsets.fontWeight[fontWeight] ?? 1;

  const adjustedWidth = width * fontSizeOffset * fontWeightOffset;

  return Math.round((adjustedWidth + Number.EPSILON) * 100) / 100;
}

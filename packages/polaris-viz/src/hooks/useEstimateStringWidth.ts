import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import {FONT_SIZE} from '../constants';

export function useEstimateStringWidth(
  string: string,
  fontSize: number = FONT_SIZE,
) {
  const {characterWidths, characterWidthOffsets} = useChartContext();

  const offset = characterWidthOffsets[fontSize] ?? 1;
  const width = estimateStringWidth(string, characterWidths);

  return width * offset;
}

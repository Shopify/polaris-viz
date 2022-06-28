import {ChartContext, estimateStringWidth} from '@shopify/polaris-viz-core';
import {useContext} from 'react';

import {FONT_SIZE} from '../constants';

export function useEstimateStringWidth(
  string: string,
  fontSize: number = FONT_SIZE,
) {
  const {characterWidths, characterWidthOffsets} = useContext(ChartContext);

  const offset = characterWidthOffsets[fontSize] ?? 1;
  const width = estimateStringWidth(string, characterWidths);

  return width * offset;
}

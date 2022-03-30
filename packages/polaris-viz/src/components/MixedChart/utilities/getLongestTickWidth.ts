import {CharacterWidths, estimateStringWidth} from '@shopify/polaris-viz-core';

import type {FormattedTicks} from '../../../types';

export function getLongestTickWidth(
  ticks: FormattedTicks[],
  characterWidths: CharacterWidths,
) {
  return ticks.reduce((prev, cur) => {
    const width = estimateStringWidth(cur.formattedValue, characterWidths);

    if (width > prev) {
      return width;
    }

    return prev;
  }, 0);
}

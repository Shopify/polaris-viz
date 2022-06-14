import {CharacterWidths, estimateStringWidth} from '@shopify/polaris-viz-core';

import type {FormattedTicks} from '../../../types';

export function getLongestTickWidth(
  ticks: FormattedTicks[],
  characterWidths: CharacterWidths,
) {
  return ticks.reduce((previous, {formattedValue}) => {
    const width = estimateStringWidth(formattedValue, characterWidths);

    if (width > previous) {
      return width;
    }

    return previous;
  }, 0);
}

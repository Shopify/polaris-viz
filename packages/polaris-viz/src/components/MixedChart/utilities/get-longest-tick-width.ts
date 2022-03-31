import type {CharacterWidths, FormattedTicks} from '../../../types';
import {estimateStringWidth} from '../../../utilities';

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

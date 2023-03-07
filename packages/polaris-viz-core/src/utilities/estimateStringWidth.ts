import type {CharacterWidths} from '../types';

const DEFAULT_WIDTH = 11.63;

export function estimateStringWidth(
  string: string,
  characterWidths: CharacterWidths,
) {
  let sum = 0;

  for (const char of string) {
    let charWidth = characterWidths[char];

    if (charWidth == null || isNaN(charWidth)) {
      charWidth = characterWidths.W ?? DEFAULT_WIDTH;
    }

    sum += charWidth;
  }

  return sum;
}

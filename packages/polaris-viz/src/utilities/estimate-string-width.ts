import type {CharacterWidths} from '../types';

export function estimateStringWidth(
  string: string,
  characterWidths: CharacterWidths,
) {
  let sum = 0;

  for (const char of string) {
    let charWidth = characterWidths[char];

    if (charWidth == null || isNaN(charWidth)) {
      charWidth = characterWidths.W;
    }

    sum += charWidth;
  }

  return sum;
}

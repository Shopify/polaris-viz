import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {estimateStringWidth} from '@shopify/polaris-viz-core';

import {ELLIPSIS} from '../../../constants';

interface Props {
  word: string;
  targetWidth: number;
  characterWidths: CharacterWidths;
}

export function endWordTruncate({word, targetWidth, characterWidths}: Props) {
  let nextCharacterIndex = 1;
  let newWord = '';

  if (
    estimateStringWidth(word, characterWidths) + characterWidths.W <=
    targetWidth
  ) {
    return word;
  }

  while (
    newWord.length < word.length &&
    estimateStringWidth(newWord, characterWidths) + characterWidths.W <
      targetWidth
  ) {
    nextCharacterIndex += 1;
    newWord = word.substring(0, nextCharacterIndex);
    newWord = `${newWord}${ELLIPSIS}`;
  }

  if (newWord.length === word.length - 1) {
    return word;
  }

  return newWord;
}

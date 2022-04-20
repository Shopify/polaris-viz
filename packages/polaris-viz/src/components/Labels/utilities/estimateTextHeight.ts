import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {estimateStringWidth} from '@shopify/polaris-viz-core';

import {LINE_HEIGHT} from '../../../constants';

interface Props {
  label: string;
  targetWidth: number;
  characterWidths: CharacterWidths;
}

export function estimateTextHeight({
  characterWidths,
  targetWidth,
  label,
}: Props) {
  const words = label.split(' ');

  let lines = 0;
  let lineWidth = 0;

  words.forEach((_, index) => {
    const wordParts = words[index].split('-');
    lines += wordParts.length;
    const wordWidth = estimateStringWidth(words[index], characterWidths);

    lineWidth += wordWidth;
    if (lineWidth > targetWidth) {
      lines += 1;
      lineWidth = wordWidth;
    }
  });

  return lines * LINE_HEIGHT;
}

import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {estimateStringWidth} from '@shopify/polaris-viz-core';

import type {PreparedLabels} from '../types';

import {endLineTruncate} from './endLineTruncate';
import {endWordTruncate} from './endWordTruncate';

interface Props {
  labels: PreparedLabels[];
  targetWidth: number;
  targetHeight: number;
  characterWidths: CharacterWidths;
}

export function truncateLabels({
  labels,
  targetWidth,
  targetHeight,
  characterWidths,
}: Props) {
  const truncatedLabels = [...labels];

  labels.forEach((_, index) => {
    truncatedLabels[index].truncatedWords = [];
    truncatedLabels[index].words = [];

    const words = truncatedLabels[index].text
      .split(/(\s+)/)
      .filter((word) => word.trim().length > 0);

    words.forEach((word) => {
      const wordWidth = estimateStringWidth(word, characterWidths);

      truncatedLabels[index].words.push({
        word,
        wordWidth,
      });

      if (wordWidth > targetWidth) {
        truncatedLabels[index].truncatedWords.push(
          endWordTruncate({
            word,
            targetWidth,
            characterWidths,
          }),
        );
      } else {
        truncatedLabels[index].truncatedWords.push(word);
      }
    });

    truncatedLabels[index].truncatedName =
      truncatedLabels[index].truncatedWords.join(' ');

    truncatedLabels[index].truncatedName = endLineTruncate({
      label: truncatedLabels[index].truncatedName,
      targetWidth,
      targetHeight,
      characterWidths,
    });

    truncatedLabels[index].truncatedWidth = estimateStringWidth(
      truncatedLabels[index].truncatedName,
      characterWidths,
    );

    truncatedLabels[index].truncatedWords =
      truncatedLabels[index].truncatedName.split(' ');
  });

  return truncatedLabels;
}

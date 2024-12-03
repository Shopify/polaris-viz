import type {CharacterWidths} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../../utilities/estimateStringWidthWithOffset';
import type {PreparedLabels} from '../../../types';

import {endLineTruncate} from './endLineTruncate';
import {endWordTruncate} from './endWordTruncate';

interface Props {
  labels: PreparedLabels[];
  targetWidth: number;
  targetHeight: number;
  characterWidths: CharacterWidths;
  skipEndWordTruncate?: boolean;
}

export function truncateLabels({
  labels,
  targetWidth,
  targetHeight,
  characterWidths,
  skipEndWordTruncate = false,
}: Props) {
  const truncatedLabels = [...labels];

  labels.forEach(({fontSize}, index) => {
    truncatedLabels[index].truncatedWords = [];
    truncatedLabels[index].words = [];

    const words = truncatedLabels[index].text
      .split(/(\s+)/)
      .filter((word) => word.trim().length > 0);

    if (skipEndWordTruncate) {
      truncatedLabels[index].truncatedWords.push(truncatedLabels[index].text);
    } else {
      words.forEach((word) => {
        const wordWidth = estimateStringWidthWithOffset(word, fontSize);

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
    }

    truncatedLabels[index].truncatedName =
      truncatedLabels[index].truncatedWords.join(' ');

    truncatedLabels[index].truncatedName = endLineTruncate({
      label: truncatedLabels[index].truncatedName,
      targetWidth,
      targetHeight,
      characterWidths,
    });

    truncatedLabels[index].truncatedWidth = estimateStringWidthWithOffset(
      truncatedLabels[index].truncatedName,
      truncatedLabels[index].fontSize,
    );

    truncatedLabels[index].truncatedWords =
      truncatedLabels[index].truncatedName.split(' ');
  });

  return truncatedLabels;
}

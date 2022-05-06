import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {estimateStringWidth} from '@shopify/polaris-viz-core';

import {LINE_HEIGHT} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../../../types';

import {endWordTruncate} from './endWordTruncate';
import {truncateLabels} from './truncateLabels';

const NEXT_INDEX = 1;

interface Props {
  labels: PreparedLabels[];
  targetHeight: number;
  targetWidth: number;
  characterWidths: CharacterWidths;
}

export function getHorizontalLabels({
  labels,
  targetHeight,
  targetWidth,
  characterWidths,
}: Props) {
  const truncatedLabels = truncateLabels({
    labels,
    targetWidth,
    targetHeight,
    characterWidths,
  });

  const lines: FormattedLine[][] = [];
  let longestLineCount = 0;

  truncatedLabels.forEach((label, index) => {
    lines[index] = [];

    let line = '';
    let lineNumber = 0;
    const words = label.truncatedWords;

    // The reason we use a for loop here is we want
    // to be able to advance the loop below if we
    // are able to add multiple words to a line.
    // In that case, the while loop below will keep
    // skipping indexes until we need to break onto
    // another line.
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      if (
        label.words[wordIndex] &&
        label.words[wordIndex].wordWidth > targetWidth
      ) {
        words[wordIndex] = endWordTruncate({
          word: words[wordIndex],
          targetWidth,
          characterWidths,
        });
      }

      line += words[wordIndex];

      while (
        words[wordIndex + 1] != null &&
        estimateStringWidth(
          `${line} ${words[wordIndex + NEXT_INDEX]}`,
          characterWidths,
        ) < targetWidth
      ) {
        line += ` ${words[wordIndex + NEXT_INDEX]}`;
        wordIndex += 1;
      }

      lines[index].push({
        truncatedText: line,
        fullText: truncatedLabels[index].text,
        x: targetWidth / 2,
        y: lineNumber * LINE_HEIGHT,
        width: targetWidth,
        height: LINE_HEIGHT,
        textAnchor: 'middle',
        dominantBaseline: 'hanging',
      });

      lineNumber += 1;
      line = '';

      if (lineNumber > longestLineCount) {
        longestLineCount = lineNumber;
      }
    }
  });

  return {
    lines,
    containerHeight: longestLineCount * LINE_HEIGHT,
  };
}

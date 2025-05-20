import type {CharacterWidths} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../../utilities';
import {LINE_HEIGHT} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../../../types';

import {endWordTruncate} from './endWordTruncate';
import {truncateLabels} from './truncateLabels';

const NEXT_INDEX = 1;

interface Props {
  align: 'center' | 'left';
  fontSize: number;
  labels: PreparedLabels[];
  targetHeight: number;
  targetWidth: number;
  characterWidths: CharacterWidths;
  activeIndex?: number;
  fillColor?: string;
}

export function getHorizontalLabels({
  align,
  fontSize,
  labels,
  targetHeight,
  targetWidth,
  characterWidths,
  activeIndex,
  fillColor,
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
    const isActiveIndex = activeIndex === index;

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
        estimateStringWidthWithOffset(
          `${line} ${words[wordIndex + NEXT_INDEX]}`,
          fontSize,
        ) < targetWidth
      ) {
        line += ` ${words[wordIndex + NEXT_INDEX]}`;
        wordIndex += 1;
      }

      lines[index].push({
        truncatedText: line,
        fullText: truncatedLabels[index].text,
        x: align === 'left' ? 0 : targetWidth / 2,
        y: lineNumber * LINE_HEIGHT,
        fontSize: label.fontSize,
        width: targetWidth,
        height: LINE_HEIGHT,
        textAnchor: align === 'left' ? 'start' : 'middle',
        dominantBaseline: 'hanging',
        style: isActiveIndex ? {fontWeight: '600'} : undefined,
        fill: isActiveIndex ? fillColor : undefined,
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

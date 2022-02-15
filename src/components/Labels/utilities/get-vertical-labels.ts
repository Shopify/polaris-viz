import type {CharacterWidths} from 'types';

import {LINE_HEIGHT, VERTICAL_LABEL_TARGET_WIDTH} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../types';

import {truncateLabels} from './truncate-labels';

interface Props {
  labels: PreparedLabels[];
  characterWidths: CharacterWidths;
}

export function getVerticalLabels({labels, characterWidths}: Props) {
  const truncatedLabels = truncateLabels({
    labels,
    targetWidth: VERTICAL_LABEL_TARGET_WIDTH,
    targetHeight: LINE_HEIGHT,
    characterWidths,
  });

  const lines: FormattedLine[][] = [];
  let longestString = 0;

  for (let i = 0; i < labels.length; i++) {
    lines[i] = [];
    lines[i].push({
      truncatedText: truncatedLabels[i].truncatedName,
      fullText: truncatedLabels[i].text,
      y: LINE_HEIGHT / 4,
      x: 0,
      width: VERTICAL_LABEL_TARGET_WIDTH,
      height: LINE_HEIGHT,
      textAnchor: 'end',
      transform: `translate(${LINE_HEIGHT}) rotate(-90)`,
    });

    if (truncatedLabels[i].truncatedWidth > longestString) {
      longestString = truncatedLabels[i].truncatedWidth;
    }
  }

  return {
    lines,
    containerHeight: longestString,
  };
}

import type {CharacterWidths} from '../../../types';
import {clamp} from '../../../utilities';
import {LINE_HEIGHT, VERTICAL_LABEL_TARGET_WIDTH} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../types';

import {truncateLabels} from './truncate-labels';

const QUARTER = 4;

interface Props {
  labels: PreparedLabels[];
  characterWidths: CharacterWidths;
  maxWidth: number;
  targetWidth: number;
}

export function getVerticalLabels({
  labels,
  characterWidths,
  maxWidth,
  targetWidth,
}: Props) {
  const clampedTargetWidth = clamp({
    amount: maxWidth,
    min: maxWidth,
    max: VERTICAL_LABEL_TARGET_WIDTH,
  });
  const truncatedLabels = truncateLabels({
    labels,
    targetWidth: clampedTargetWidth,
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
      y: LINE_HEIGHT / QUARTER,
      x: 0,
      width: clampedTargetWidth,
      height: LINE_HEIGHT,
      textAnchor: 'end',
      transform: `translate(${targetWidth / 2}) rotate(-90)`,
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

import {
  LINE_HEIGHT,
  MAX_DIAGONAL_LABEL_WIDTH,
  MAX_DIAGONAL_VISIBLE_HEIGHT,
} from '../../../constants';
import type {CharacterWidths} from '../../../types';
import {clamp} from '../../../utilities';
import type {FormattedLine, PreparedLabels} from '../types';

import {getWidestTruncatedWidth} from './get-widest-truncated-width';
import {truncateLabels} from './truncate-labels';

interface Props {
  labels: PreparedLabels[];
  targetHeight: number;
  targetWidth: number;
  characterWidths: CharacterWidths;
}

export function getDiagonalLabels({
  labels,
  targetHeight,
  targetWidth,
  characterWidths,
}: Props) {
  const truncatedLabels = truncateLabels({
    labels,
    targetWidth: MAX_DIAGONAL_LABEL_WIDTH,
    targetHeight,
    characterWidths,
  });

  const lines: FormattedLine[][] = [];
  const centerPoint = targetWidth / 2 - LINE_HEIGHT / 2;

  for (let i = 0; i < labels.length; i++) {
    lines[i] = [];
    lines[i].push({
      truncatedText: truncatedLabels[i].truncatedName,
      fullText: truncatedLabels[i].text,
      y: centerPoint,
      x: centerPoint,
      dominantBaseline: 'hanging',
      width: truncatedLabels[i].truncatedWidth,
      height: LINE_HEIGHT,
      textAnchor: 'end',
      transform: `rotate(-45)`,
    });
  }

  const truncatedWidth = getWidestTruncatedWidth(truncatedLabels);

  return {
    lines,
    containerHeight: clamp({
      amount: getRotatedHeight(truncatedWidth, 45, targetHeight),
      min: 0,
      max: MAX_DIAGONAL_VISIBLE_HEIGHT,
    }),
  };
}

function getRotatedHeight(
  width: number,
  angle: number,
  originalHeight: number,
) {
  const radians = (Math.PI / 180) * angle;
  const hypotenuse = width * Math.sin(radians);
  const opp = originalHeight * Math.cos(radians);

  return Math.round(hypotenuse + opp);
}
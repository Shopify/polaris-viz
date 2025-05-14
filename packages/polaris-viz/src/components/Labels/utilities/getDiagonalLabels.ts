import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import {
  LINE_HEIGHT,
  MAX_DIAGONAL_LABEL_WIDTH,
  MAX_DIAGONAL_VISIBLE_HEIGHT,
} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../../../types';

import {getWidestLabel} from './getWidestLabel';
import {truncateLabels} from './truncateLabels';

interface Props {
  labels: PreparedLabels[];
  longestLabelWidth: number;
  targetHeight: number;
  targetWidth: number;
  characterWidths: CharacterWidths;
  activeIndex?: number;
  fillColor?: string;
}

export function getDiagonalLabels({
  characterWidths,
  labels,
  longestLabelWidth,
  targetHeight,
  targetWidth,
  activeIndex,
  fillColor,
}: Props) {
  const clampedTargetWidth = clamp({
    amount: longestLabelWidth,
    min: targetWidth,
    max: MAX_DIAGONAL_LABEL_WIDTH,
  });

  const truncatedLabels = truncateLabels({
    labels,
    targetWidth: clampedTargetWidth,
    targetHeight,
    characterWidths,
    skipEndWordTruncate: true,
  });

  const lines: FormattedLine[][] = [];
  const centerPoint = targetWidth / 2 - LINE_HEIGHT / 2;

  for (let i = 0; i < labels.length; i++) {
    const isActiveIndex = activeIndex === i;
    lines[i] = [];
    lines[i].push({
      truncatedText: truncatedLabels[i].truncatedName,
      fullText: truncatedLabels[i].text,
      fontSize: labels[i].fontSize,
      y: centerPoint,
      x: centerPoint,
      dominantBaseline: 'hanging',
      width: clampedTargetWidth,
      height: LINE_HEIGHT,
      textAnchor: 'end',
      transform: `rotate(-45)`,
      style: isActiveIndex ? {fontWeight: '600'} : undefined,
      fill: isActiveIndex ? fillColor : undefined,
    });
  }

  const {truncatedWidth} = getWidestLabel(truncatedLabels);

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

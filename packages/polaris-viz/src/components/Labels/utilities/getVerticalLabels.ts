import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {clamp} from '@shopify/polaris-viz-core';

import {LINE_HEIGHT, VERTICAL_LABEL_TARGET_WIDTH} from '../../../constants';
import type {FormattedLine, PreparedLabels} from '../../../types';

import {truncateLabels} from './truncateLabels';

const QUARTER = 4;

interface Props {
  targetWidth: number;
  longestLabelWidth: number;
  labels: PreparedLabels[];
  characterWidths: CharacterWidths;
  activeIndex?: number;
  fillColor?: string;
}

export function getVerticalLabels({
  labels,
  characterWidths,
  longestLabelWidth,
  targetWidth,
  activeIndex,
  fillColor,
}: Props) {
  const clampedTargetWidth = clamp({
    amount: longestLabelWidth,
    min: targetWidth,
    max: VERTICAL_LABEL_TARGET_WIDTH,
  });
  const truncatedLabels = truncateLabels({
    labels,
    targetWidth: clampedTargetWidth,
    targetHeight: LINE_HEIGHT,
    characterWidths,
    skipEndWordTruncate: true,
  });

  const lines: FormattedLine[][] = [];
  let longestString = 0;

  for (let i = 0; i < labels.length; i++) {
    const isActiveIndex = activeIndex === i;
    lines[i] = [];
    lines[i].push({
      truncatedText: truncatedLabels[i].truncatedName,
      fontSize: labels[i].fontSize,
      fullText: truncatedLabels[i].text,
      y: LINE_HEIGHT / QUARTER,
      x: 0,
      width: clampedTargetWidth,
      height: LINE_HEIGHT,
      textAnchor: 'end',
      transform: `translate(${targetWidth / 2}) rotate(-90)`,
      style: isActiveIndex ? {fontWeight: '600'} : undefined,
      fill: isActiveIndex ? fillColor : undefined,
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

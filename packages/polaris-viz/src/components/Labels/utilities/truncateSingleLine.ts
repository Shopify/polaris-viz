import type {CharacterWidths} from '@shopify/polaris-viz-core';
import {estimateStringWidth} from '@shopify/polaris-viz-core';

import {ELLIPSIS} from '../../../constants';

import {formatAndAddEllipsis} from './formatAndAddEllipsis';

interface Props {
  characterWidths: CharacterWidths;
  label: string;
  targetWidth: number;
}

export function truncateSingleLine({
  characterWidths,
  label,
  targetWidth,
}: Props) {
  const estimatedWidth = estimateStringWidth(label, characterWidths);

  if (estimatedWidth <= targetWidth) {
    return label;
  }

  const characters = label.split('');

  let width = 0;
  let newLabel = '';
  let index = 0;

  while (width <= targetWidth - characterWidths[ELLIPSIS]) {
    width += characterWidths[characters[index]];
    newLabel += characters[index];

    index++;
  }

  return formatAndAddEllipsis(newLabel);
}

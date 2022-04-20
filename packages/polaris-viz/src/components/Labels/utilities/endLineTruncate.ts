import type {CharacterWidths} from '@shopify/polaris-viz-core';

import {LINE_HEIGHT} from '../../../constants';

import {truncateLastLine} from './truncateLastLine';
import {truncateSingleLine} from './truncateSingleLine';

interface Props {
  label: string;
  targetWidth: number;
  targetHeight: number;
  characterWidths: CharacterWidths;
}

export function endLineTruncate({
  label,
  targetWidth,
  targetHeight,
  characterWidths,
}: Props) {
  const isSingleLine = targetHeight <= LINE_HEIGHT;

  if (isSingleLine) {
    return truncateSingleLine({label, targetWidth, characterWidths});
  }

  return truncateLastLine({label, targetWidth, targetHeight, characterWidths});
}

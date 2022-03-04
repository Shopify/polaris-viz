import {LINE_HEIGHT} from '../../../constants';
import type {CharacterWidths} from '../../../types';

import {truncateLastLine} from './truncate-last-line';
import {truncateSingleLine} from './truncate-single-line';

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

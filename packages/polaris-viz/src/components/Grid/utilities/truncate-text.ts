import {estimateStringWidth} from '@shopify/polaris-viz-core';

import {ELLIPSIS_CHARACTER} from './constants';

export function truncateText(
  text: string,
  maxWidth: number,
  characterWidths: {[key: string]: number},
) {
  const estimatedWidth = estimateStringWidth(text, characterWidths);

  if (estimatedWidth < maxWidth) {
    return text;
  }

  let truncated = text;
  while (
    estimateStringWidth(`${truncated}${ELLIPSIS_CHARACTER}`, characterWidths) >
      maxWidth &&
    truncated.length > 0
  ) {
    truncated = truncated.slice(0, -1);
  }

  return truncated.length === 0 ? '' : `${truncated}${ELLIPSIS_CHARACTER}`;
}

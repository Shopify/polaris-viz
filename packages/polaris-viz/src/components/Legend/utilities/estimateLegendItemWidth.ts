import {CharacterWidths, estimateStringWidth} from '@shopify/polaris-viz-core';

import {PREVIEW_ICON_SIZE} from '../../../constants';
import {
  LEGEND_ITEM_GAP,
  LEGEND_ITEM_LEFT_PADDING,
  LEGEND_ITEM_RIGHT_PADDING,
} from '../constants';

export function estimateLegendItemWidth(
  text: string,
  characterWidths: CharacterWidths,
) {
  const stringWidth = estimateStringWidth(text, characterWidths);

  return (
    LEGEND_ITEM_LEFT_PADDING +
    PREVIEW_ICON_SIZE +
    stringWidth +
    LEGEND_ITEM_GAP +
    LEGEND_ITEM_RIGHT_PADDING
  );
}

import {COLOR_VISION_SINGLE_ITEM} from '@shopify/polaris-viz-core';

import {getEventName} from '../hooks/ColorVisionA11y';

export function setSingleSeriesActive(id: string, index: number) {
  const custom = new CustomEvent(getEventName(id, COLOR_VISION_SINGLE_ITEM), {
    detail: {
      index,
    },
  });

  window.dispatchEvent(custom);
}

import {EXTERNAL_EVENTS_SET_HIDDEN_ITEMS} from '@shopify/polaris-viz-core';

import {getEventName} from '../../ColorVisionA11y';

export function setHiddenItems(id: string, indexes: number[]) {
  const custom = new CustomEvent(
    getEventName(id, EXTERNAL_EVENTS_SET_HIDDEN_ITEMS),
    {
      detail: {
        indexes,
      },
    },
  );

  window.dispatchEvent(custom);
}

import {EXTERNAL_EVENTS_SET_HIDDEN_ITEMS} from '@shopify/polaris-viz-core';
import {useState} from 'react';

import {useWatchColorVisionEvents} from '../ColorVisionA11y/useWatchColorVisionEvents';
import type {ExternalEventReturn} from '../../types';

export function useExternalHideEvents() {
  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

  useWatchColorVisionEvents<ExternalEventReturn>({
    type: EXTERNAL_EVENTS_SET_HIDDEN_ITEMS,
    onIndexChange: ({detail}) => {
      setHiddenIndexes(detail.indexes);
    },
  });

  return {hiddenIndexes};
}

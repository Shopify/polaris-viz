import {COLOR_VISION_SINGLE_ITEM} from '@shopify/polaris-viz-core';
import {useEffect} from 'react';

import type {ColorVisionEventReturn} from '../types';

import {getEventName} from './ColorVisionA11y';
import {useCallbackRef} from './useCallbackRef';

export function useWatchActiveSeries(
  id: string,
  onIndexChange: (event: ColorVisionEventReturn) => void,
) {
  const onIndexChangeCallback = useCallbackRef(onIndexChange);

  useEffect(() => {
    const eventName = getEventName(id, COLOR_VISION_SINGLE_ITEM);

    window.addEventListener(eventName, onIndexChangeCallback);

    return () => {
      window.removeEventListener(eventName, onIndexChangeCallback);
    };
  }, [id, onIndexChangeCallback]);
}

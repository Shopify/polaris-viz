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
    const clearActiveSeriesListener = setActiveSeriesListener(
      id,
      onIndexChangeCallback,
    );

    return () => clearActiveSeriesListener();
  }, [id, onIndexChangeCallback]);
}

export function setActiveSeriesListener(
  id: string,
  onIndexChange: (event: ColorVisionEventReturn) => void,
) {
  const eventName = getEventName(id, COLOR_VISION_SINGLE_ITEM);

  window.addEventListener(eventName, onIndexChange);

  return () => {
    window.removeEventListener(eventName, onIndexChange);
  };
}

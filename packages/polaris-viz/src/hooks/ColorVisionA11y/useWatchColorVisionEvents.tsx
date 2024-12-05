import {useEffect} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';
import type {ColorVisionEventReturn} from 'types';

import {useCallbackRef} from '../useCallbackRef';

import {getEventName} from './utilities';

interface Props<T> {
  type: string;
  onIndexChange: (event: T) => void;
}

export function useWatchColorVisionEvents<
  T extends CustomEvent = ColorVisionEventReturn,
>({type, onIndexChange}: Props<T>) {
  const onIndexChangeCallback = useCallbackRef(onIndexChange);
  const {id} = useChartContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    const eventName = getEventName(id, type);

    window.addEventListener(eventName, onIndexChangeCallback);

    return () => {
      window.removeEventListener(eventName, onIndexChangeCallback);
    };
  }, [id, type, onIndexChangeCallback]);
}

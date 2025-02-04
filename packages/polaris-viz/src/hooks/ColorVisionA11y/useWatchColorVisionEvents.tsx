import {useEffect} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';
import type {ColorVisionEventReturn} from 'types';

import {useCallbackRef} from '..';

import {getEventName} from './utilities';

interface Props<T> {
  type: string;
  onIndexChange: (event: T) => void;
  enabled?: boolean;
}

export function useWatchColorVisionEvents<
  T extends CustomEvent = ColorVisionEventReturn,
>({type, onIndexChange, enabled = true}: Props<T>) {
  const onIndexChangeCallback = useCallbackRef(onIndexChange);
  const {id} = useChartContext();

  useEffect(() => {
    if (!id || !enabled) {
      return;
    }

    const eventName = getEventName(id, type);

    window.addEventListener(eventName, onIndexChangeCallback);

    return () => {
      window.removeEventListener(eventName, onIndexChangeCallback);
    };
  }, [id, type, onIndexChangeCallback, enabled]);
}

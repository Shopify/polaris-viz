import {useContext, useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';
import {ChartContext} from '@shopify/polaris-viz-core';
import type {ColorVisionEventReturn} from '@shopify/polaris-viz-core';

import {useCallbackRef} from '..';

import {getEventName} from './utilities';

export interface Props {
  type: string;
  onIndexChange: (event: ColorVisionEventReturn) => void;
}

export function useWatchColorVisionEvents({type, onIndexChange}: Props) {
  const [debounced] = useDebouncedCallback(onIndexChange, 0);

  const onIndexChangeCallback = useCallbackRef(debounced);
  const {id} = useContext(ChartContext);

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

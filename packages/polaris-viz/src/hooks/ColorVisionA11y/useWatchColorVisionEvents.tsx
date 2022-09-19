import {useEffect} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {useCallbackRef} from '..';

import {getEventName} from './utilities';

interface EventReturn extends CustomEvent {
  detail: {
    index: number;
  };
}
interface Props {
  type: string;
  onIndexChange: (event: EventReturn) => void;
}

export function useWatchColorVisionEvents({type, onIndexChange}: Props) {
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

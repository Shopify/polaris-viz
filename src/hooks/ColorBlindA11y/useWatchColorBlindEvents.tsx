import {useContext, useEffect} from 'react';
import {useDebouncedCallback} from 'use-debounce/lib';

import {ChartContext} from '../../components';
import {useCallbackRef} from '../../hooks';

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

export function useWatchColorBlindEvents({type, onIndexChange}: Props) {
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

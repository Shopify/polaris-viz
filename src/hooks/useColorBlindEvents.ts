import {useContext, useEffect} from 'react';

import {ChartContext} from '../components';

import {useCallbackRef} from './useCallbackRef';

const EVENT_STRING = 'data-color-blind-event';
const DATA_SET_STRING = 'colorBlindEvent';
const EVENT_NAME = 'color-blind-event';

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDataSetItem(dataset: DOMStringMap, name: string) {
  return dataset[`${DATA_SET_STRING}${capitalize(name)}`];
}

function getEventName(id: string, type: string) {
  return `${id}:${EVENT_NAME}:${type}`;
}

interface EventReturn extends CustomEvent {
  detail: {
    index: number;
  };
}

export function useColorBlindEvents() {
  const {id} = useContext(ChartContext);

  useEffect(() => {
    const items = document.querySelectorAll(
      `#chart_${id} [${EVENT_STRING}-watch="true"]`,
    );

    function onMouseEnter(event: MouseEvent) {
      const dataset = (event.srcElement as HTMLElement)?.dataset;

      const index = getDataSetItem(dataset, 'index');
      const type = getDataSetItem(dataset, 'type');

      if (id == null || type == null) {
        return;
      }

      const custom = new CustomEvent(getEventName(id, type), {
        detail: {
          index: Number(index),
        },
      });

      window.dispatchEvent(custom);
    }

    function onMouseLeave(event: MouseEvent) {
      const dataset = (event.srcElement as HTMLElement)?.dataset;

      const type = getDataSetItem(dataset, 'type');

      if (id == null || type == null) {
        return;
      }

      const custom = new CustomEvent(getEventName(id, type), {
        detail: {
          index: -1,
        },
      });

      window.dispatchEvent(custom);
    }

    items.forEach((item) => {
      (item as HTMLElement).addEventListener('mouseenter', onMouseEnter);
      (item as HTMLElement).addEventListener('mouseleave', onMouseLeave);
      (item as HTMLElement).addEventListener('focus', onMouseEnter);
      (item as HTMLElement).addEventListener('blur', onMouseLeave);
    });

    return () => {
      items.forEach((item) => {
        (item as HTMLElement).removeEventListener('mouseenter', onMouseEnter);
        (item as HTMLElement).removeEventListener('mouseleave', onMouseLeave);
        (item as HTMLElement).removeEventListener('focus', onMouseEnter);
        (item as HTMLElement).removeEventListener('blur', onMouseLeave);
      });
    };
  }, [id]);
}

interface GetColorBlindEventAttrsProps {
  type: string;
  index: number | string;
}

export function getColorBlindEventAttrs({
  type,
  index,
}: GetColorBlindEventAttrsProps) {
  return {
    [`${EVENT_STRING}-watch`]: true,
    [`${EVENT_STRING}-type`]: type,
    [`${EVENT_STRING}-index`]: index,
  };
}

interface Props {
  type: string;
  onIndexChange: (event: EventReturn) => void;
}

export function useWatchColorBlindEvents({type, onIndexChange}: Props) {
  const onIndexChangeCallback = useCallbackRef(onIndexChange);
  const {id} = useContext(ChartContext);

  useEffect(() => {
    const eventName = `${id}:${EVENT_NAME}:${type}`;

    window.addEventListener(eventName, onIndexChangeCallback);

    return () => {
      window.removeEventListener(eventName, onIndexChangeCallback);
    };
  }, [id, type, onIndexChangeCallback]);
}

import {useEffect} from 'react';

import {useCallbackRef} from './useCallbackRef';

const EVENT_STRING = 'data-color-blind-event';
const DATA_SET_STRING = 'colorBlindEvent';

const EVENT_NAME = 'cbe';

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDataSetItem(dataset: DOMStringMap, name: string) {
  return dataset[`${DATA_SET_STRING}${capitalize(name)}`];
}

interface EventReturn extends CustomEvent {
  detail: {
    index: number;
  };
}

export function useColorBlindEvents() {
  useEffect(() => {
    const items = document.querySelectorAll(`[${EVENT_STRING}-watch="true"]`);

    function onMouseEnter(event: MouseEvent) {
      const dataset = (event.srcElement as HTMLElement)?.dataset;

      const index = getDataSetItem(dataset, 'index');
      const type = getDataSetItem(dataset, 'type');

      const custom = new CustomEvent(`${EVENT_NAME}:${type}`, {
        detail: {
          index: Number(index),
        },
      });

      window.dispatchEvent(custom);
    }

    function onMouseLeave(event: MouseEvent) {
      const dataset = (event.srcElement as HTMLElement)?.dataset;

      const type = getDataSetItem(dataset, 'type');

      if (type == null) {
        return;
      }

      const custom = new CustomEvent(`${EVENT_NAME}:${type}`, {
        detail: {
          index: -1,
        },
      });

      window.dispatchEvent(custom);
    }

    items.forEach((item) => {
      (item as HTMLElement).addEventListener('mouseenter', onMouseEnter);
      (item as HTMLElement).addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      items.forEach((item) => {
        (item as HTMLElement).removeEventListener('mouseenter', onMouseEnter);
        (item as HTMLElement).removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);
}

interface GetColorBlindEventAttrsProps {
  watch?: boolean;
  respond?: boolean;
  type: string;
  index: number | string;
}

export function getColorBlindEventAttrs({
  watch = false,
  respond = false,
  type,
  index,
}: GetColorBlindEventAttrsProps) {
  return {
    [`${EVENT_STRING}-watch`]: watch,
    [`${EVENT_STRING}-respond`]: respond,
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

  useEffect(() => {
    window.addEventListener(`${EVENT_NAME}:${type}`, onIndexChangeCallback);

    return () => {
      window.removeEventListener(
        `${EVENT_NAME}:${type}`,
        onIndexChangeCallback,
      );
    };
  }, [type, onIndexChangeCallback]);
}

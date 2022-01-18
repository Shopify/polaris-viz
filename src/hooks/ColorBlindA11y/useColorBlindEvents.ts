import {useContext, useEffect} from 'react';

import {ChartContext} from '../../components';

import {COLOR_BLIND_EVENT} from './constants';
import {getDataSetItem, getEventName} from './utilities';

export function useColorBlindEvents() {
  const {id} = useContext(ChartContext);

  useEffect(() => {
    const items = document.querySelectorAll(
      `#chart_${id} [${COLOR_BLIND_EVENT.dataAttribute}-watch="true"]`,
    );

    function onMouseEnter(event: MouseEvent) {
      const dataset = (event.target as HTMLElement)?.dataset;

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
      const dataset = (event.target as HTMLElement)?.dataset;

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
      item.addEventListener('mouseenter', onMouseEnter);
      item.addEventListener('mouseleave', onMouseLeave);
      item.addEventListener('focus', onMouseEnter);
      item.addEventListener('blur', onMouseLeave);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', onMouseEnter);
        item.removeEventListener('mouseleave', onMouseLeave);
        item.removeEventListener('focus', onMouseEnter);
        item.removeEventListener('blur', onMouseLeave);
      });
    };
  }, [id]);
}

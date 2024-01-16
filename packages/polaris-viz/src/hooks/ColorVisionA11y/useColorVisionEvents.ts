import {useEffect} from 'react';
import {COLOR_VISION_EVENT, useChartContext} from '@shopify/polaris-viz-core';
import type {BoundingRect} from '@shopify/polaris-viz-core';

import {useExternalHideEvents} from '../ExternalEvents';

import {getDataSetItem, getEventName} from './utilities';

export interface Props {
  enabled?: boolean;
  dimensions?: BoundingRect;
}

export function useColorVisionEvents(props?: Partial<Props>) {
  const {enabled = true, dimensions} = props || {};

  const {id} = useChartContext();
  const {hiddenIndexes} = useExternalHideEvents();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const items = document.querySelectorAll(
      `#chart_${id} [${COLOR_VISION_EVENT.dataAttribute}-watch="true"]`,
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
  }, [id, enabled, hiddenIndexes, dimensions]);
}

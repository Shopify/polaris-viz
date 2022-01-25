import {
  COLOR_BLIND_FADED_OPACITY,
  COLOR_BLIND_ACTIVE_OPACITY,
} from '../../constants';

import {COLOR_BLIND_EVENT} from './constants';

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDataSetItem(dataset: DOMStringMap, name: string) {
  return dataset[`${COLOR_BLIND_EVENT.camelCaseName}${capitalize(name)}`];
}

export function getEventName(id: string, type: string) {
  return `${id}:${COLOR_BLIND_EVENT.name}:${type}`;
}

export function getOpacityForActive(activeIndex: number, index: number) {
  const activeOpacity =
    activeIndex === index
      ? COLOR_BLIND_ACTIVE_OPACITY
      : COLOR_BLIND_FADED_OPACITY;

  return activeIndex === -1 ? COLOR_BLIND_ACTIVE_OPACITY : activeOpacity;
}

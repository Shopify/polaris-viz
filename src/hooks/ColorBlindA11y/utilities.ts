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

export function getOpacityStylesForActive({
  activeIndex,
  index,
  fadedOpacity = COLOR_BLIND_FADED_OPACITY,
}: {
  activeIndex: number;
  index: number;
  fadedOpacity?: number;
}) {
  const activeOpacity =
    activeIndex === index ? COLOR_BLIND_ACTIVE_OPACITY : fadedOpacity;

  return {
    opacity: activeIndex === -1 ? COLOR_BLIND_ACTIVE_OPACITY : activeOpacity,
    transition: 'opacity 100ms ease',
  };
}

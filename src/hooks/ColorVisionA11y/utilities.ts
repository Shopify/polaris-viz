import {
  COLOR_VISION_FADED_OPACITY,
  COLOR_VISION_ACTIVE_OPACITY,
} from '../../constants';

import {COLOR_VISION_EVENT} from './constants';

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDataSetItem(dataset: DOMStringMap, name: string) {
  return dataset[`${COLOR_VISION_EVENT.camelCaseName}${capitalize(name)}`];
}

export function getEventName(id: string, type: string) {
  return `${id}:${COLOR_VISION_EVENT.name}:${type}`;
}

export function getOpacityStylesForActive({
  activeIndex,
  index,
  fadedOpacity = COLOR_VISION_FADED_OPACITY,
}: {
  activeIndex: number;
  index: number;
  fadedOpacity?: number;
}) {
  const activeOpacity =
    activeIndex === index ? COLOR_VISION_ACTIVE_OPACITY : fadedOpacity;

  return {
    opacity: activeIndex === -1 ? COLOR_VISION_ACTIVE_OPACITY : activeOpacity,
    transition: 'opacity 100ms ease',
  };
}

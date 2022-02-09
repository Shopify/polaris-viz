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
}: {
  activeIndex: number;
  index: number;
}) {
  const activeOpacity =
    activeIndex === index
      ? COLOR_VISION_ACTIVE_OPACITY
      : COLOR_VISION_FADED_OPACITY;

  return {
    opacity: activeIndex === -1 ? COLOR_VISION_ACTIVE_OPACITY : activeOpacity,
    transition: 'opacity 100ms ease',
  };
}

export function getScaleStylesForActive({
  activeIndex,
  index,
}: {
  activeIndex: number;
  index: number;
}) {
  const activeScale = activeIndex === index ? 1 : 0;
  const scale = activeIndex === -1 ? 1 : activeScale;

  return {
    transform: `scale(${scale})`,
    transition: 'transform 150ms ease',
  };
}

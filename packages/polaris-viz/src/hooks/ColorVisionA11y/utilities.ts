import {COLOR_VISION_EVENT} from '@shopify/polaris-viz-core';

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDataSetItem(dataset: DOMStringMap, name: string) {
  return dataset[`${COLOR_VISION_EVENT.camelCaseName}${capitalize(name)}`];
}

export function getEventName(id: string, type: string) {
  return `${id}:${COLOR_VISION_EVENT.name}:${type}`;
}

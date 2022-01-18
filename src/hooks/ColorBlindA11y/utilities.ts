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

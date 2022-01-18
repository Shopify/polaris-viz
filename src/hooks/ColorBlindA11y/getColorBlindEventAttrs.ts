import {COLOR_BLIND_EVENT} from './constants';

interface Props {
  type: string;
  index: number | string;
}

export function getColorBlindEventAttrs({type, index}: Props) {
  return {
    [`${COLOR_BLIND_EVENT.dataAttribute}-watch`]: true,
    [`${COLOR_BLIND_EVENT.dataAttribute}-type`]: type,
    [`${COLOR_BLIND_EVENT.dataAttribute}-index`]: index,
  };
}

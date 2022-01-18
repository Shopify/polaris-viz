import {COLOR_VISION_EVENT} from './constants';

interface Props {
  type: string;
  index: number | string;
}

export function getColorVisionEventAttrs({type, index}: Props) {
  return {
    [`${COLOR_VISION_EVENT.dataAttribute}-watch`]: true,
    [`${COLOR_VISION_EVENT.dataAttribute}-type`]: type,
    [`${COLOR_VISION_EVENT.dataAttribute}-index`]: index,
  };
}

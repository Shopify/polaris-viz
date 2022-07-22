import {COLOR_VISION_EVENT} from '../constants';

interface Props {
  type: string;
  index: number | string;
  watch?: boolean;
}

export function getColorVisionEventAttrs({type, index, watch = true}: Props) {
  return {
    [`${COLOR_VISION_EVENT.dataAttribute}-watch`]: watch,
    [`${COLOR_VISION_EVENT.dataAttribute}-type`]: type,
    [`${COLOR_VISION_EVENT.dataAttribute}-index`]: index,
  };
}

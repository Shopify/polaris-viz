import {LOAD_ANIMATION_DURATION} from '@shopify/polaris-viz-core';

export function getLoadAnimationDelay(index, dataLength) {
  return index * (LOAD_ANIMATION_DURATION / dataLength);
}

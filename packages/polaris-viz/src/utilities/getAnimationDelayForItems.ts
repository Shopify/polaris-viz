import {DEFAULT_ANIMATION_DELAY} from '../constants';

export function getAnimationDelayForItems(count: number) {
  const scalingFactor = count * 0.1;

  return Math.min(
    DEFAULT_ANIMATION_DELAY / scalingFactor,
    DEFAULT_ANIMATION_DELAY,
  );
}

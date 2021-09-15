import {MAX_TRAIL_DURATION} from 'consts';

export function getAnimationTrail(dataLength: number) {
  return MAX_TRAIL_DURATION / dataLength;
}

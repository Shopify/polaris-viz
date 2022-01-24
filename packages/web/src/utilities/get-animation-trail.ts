import {MAX_TRAIL_DURATION} from '../constants';

export function getAnimationTrail(dataLength: number) {
  return MAX_TRAIL_DURATION / dataLength;
}

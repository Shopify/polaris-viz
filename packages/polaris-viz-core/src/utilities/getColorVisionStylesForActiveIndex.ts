import {
  COLOR_VISION_FADED_OPACITY,
  COLOR_VISION_ACTIVE_OPACITY,
} from '../constants';

export function getColorVisionStylesForActiveIndex({
  activeIndex,
  index,
  fadedOpacity = COLOR_VISION_FADED_OPACITY,
}: {
  activeIndex: number;
  index: number;
  fadedOpacity?: number;
}) {
  const activeOpacity =
    activeIndex === index ? COLOR_VISION_ACTIVE_OPACITY : fadedOpacity;

  return {
    opacity: activeIndex === -1 ? COLOR_VISION_ACTIVE_OPACITY : activeOpacity,
    transition: 'opacity 100ms ease',
  };
}

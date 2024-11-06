import {FONT_SIZE, TOUCH_FONT_SIZE} from '@shopify/polaris-viz-core';

export function getFontSize() {
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const fontSize = isMobile ? TOUCH_FONT_SIZE : FONT_SIZE;

  return fontSize;
}

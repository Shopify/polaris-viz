import {getColorVisionStylesForActiveIndex} from '@shopify/polaris-viz-core';

export function applyColorVisionToDomElement({
  element,
  activeIndex,
  isPerformanceImpacted,
}) {
  const index = Number(element.dataset.index);

  const {opacity, transition} = getColorVisionStylesForActiveIndex({
    activeIndex,
    index,
  });

  element.style.opacity = `${opacity}`;
  element.style.transition = isPerformanceImpacted ? 'none' : transition;
}

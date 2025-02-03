import type {Dimensions} from '@shopify/polaris-viz-core';
import {clamp, HORIZONTAL_GROUP_LABEL_HEIGHT} from '@shopify/polaris-viz-core';

import {SCROLLBAR_WIDTH, TOOLTIP_MARGIN} from '../constants';
import type {AlteredPositionProps, AlteredPositionReturn} from '../types';

export function getAlteredHorizontalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  if (props.currentX < 0) {
    return getNegativeOffset(props);
  }
  return getPositiveOffset(props);
}

function getNegativeOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, currentX, currentY, tooltipDimensions} = props;

  const flippedX = currentX * -1;
  const yOffset = (bandwidth - tooltipDimensions.height) / 2;

  const y = currentY - tooltipDimensions.height;

  if (flippedX - tooltipDimensions.width < 0) {
    return clampPosition({
      x: flippedX,
      y: y < 0 ? 0 : y,
      tooltipDimensions,
    });
  }

  return clampPosition({
    x: flippedX - tooltipDimensions.width - TOOLTIP_MARGIN,
    y: currentY + HORIZONTAL_GROUP_LABEL_HEIGHT + yOffset,
    tooltipDimensions,
  });
}

function getPositiveOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {currentX, currentY} = props;

  return clampPosition({
    x: currentX,
    y: currentY,
    tooltipDimensions: props.tooltipDimensions,
  });
}

function clampPosition({
  x,
  y,
  tooltipDimensions,
}: {
  x: number;
  y: number;
  tooltipDimensions: Dimensions;
}) {
  return {
    x: clamp({
      amount: x,
      min: TOOLTIP_MARGIN,
      max:
        window.innerWidth -
        tooltipDimensions.width -
        TOOLTIP_MARGIN -
        SCROLLBAR_WIDTH,
    }),
    y: clamp({
      amount: y,
      min: window.scrollY + TOOLTIP_MARGIN,
      max:
        window.scrollY +
        window.innerHeight -
        tooltipDimensions.height -
        TOOLTIP_MARGIN,
    }),
  };
}

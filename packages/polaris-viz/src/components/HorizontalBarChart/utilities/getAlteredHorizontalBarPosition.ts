import type {BoundingRect, Dimensions} from '@shopify/polaris-viz-core';

import {HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';
import type {
  AlteredPositionProps,
  AlteredPositionReturn,
} from '../../../components/TooltipWrapper';
import {
  TOOLTIP_MARGIN,
  TooltipHorizontalOffset,
} from '../../../components/TooltipWrapper';

export function getAlteredHorizontalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  if (props.position.horizontal === TooltipHorizontalOffset.Left) {
    return getNegativeOffset(props);
  }

  return getPositiveOffset(props);
}

function getNegativeOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, currentX, currentY, tooltipDimensions, chartBounds} = props;

  const x = currentX + chartBounds.x;
  const y = currentY + chartBounds.y;

  const xOffset = x - tooltipDimensions.width - TOOLTIP_MARGIN;
  const yOffset = (bandwidth - tooltipDimensions.height) / 2;

  if (xOffset < 0) {
    const outsideY =
      y - tooltipDimensions.height + HORIZONTAL_GROUP_LABEL_HEIGHT + yOffset;

    return {
      x,
      y: outsideY,
    };
  }

  return {
    x: xOffset,
    y,
  };
}

function getPositiveOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, currentX, currentY, tooltipDimensions, chartBounds} = props;

  const x = currentX + chartBounds.x + TOOLTIP_MARGIN;
  const y = currentY + chartBounds.y;

  const isOutside = isOutsideBounds({
    x,
    y,
    tooltipDimensions,
    chartBounds,
  });

  if (isOutside.top && isOutside.right) {
    return {
      x: x - tooltipDimensions.width,
      y: window.scrollY + bandwidth,
    };
  }

  if (isOutside.top && !isOutside.right) {
    return {
      x,
      y: 0,
    };
  }

  if (isOutside.right) {
    const outsideX = x - tooltipDimensions.width - TOOLTIP_MARGIN;
    const outsideY = y - tooltipDimensions.height;

    if (outsideY < window.scrollY) {
      return {
        x: outsideX,
        y: currentY + bandwidth + HORIZONTAL_GROUP_LABEL_HEIGHT,
      };
    }

    return {
      x: outsideX,
      y: outsideY,
    };
  }

  if (isOutside.bottom) {
    return {
      x,
      y:
        window.scrollY +
        window.innerHeight -
        tooltipDimensions.height -
        HORIZONTAL_GROUP_LABEL_HEIGHT,
    };
  }

  return {x, y};
}

function isOutsideBounds({
  x,
  y,
  tooltipDimensions,
}: {
  x: number;
  y: number;
  tooltipDimensions: Dimensions;
  chartBounds: BoundingRect;
}) {
  const right = x + tooltipDimensions.width + TOOLTIP_MARGIN;
  const bottom = y + tooltipDimensions.height;

  return {
    left: x <= 0,
    right: right > window.innerWidth,
    bottom: bottom > window.scrollY + window.innerHeight,
    top: y <= window.scrollY,
  };
}

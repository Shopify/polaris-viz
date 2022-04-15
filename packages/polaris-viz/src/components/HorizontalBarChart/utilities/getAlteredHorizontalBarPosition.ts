import type {Dimensions} from '@shopify/polaris-viz-core';

import {HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';
import {
  AlteredPositionProps,
  AlteredPositionReturn,
  TOOLTIP_MARGIN,
} from '../../../components/TooltipWrapper';

export function getAlteredHorizontalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  if (props.currentX < 0) {
    return getNegativeOffset(props);
  }
  return getPositiveOffset(props);
}

function getNegativeOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, chartDimensions, currentX, currentY, tooltipDimensions} =
    props;

  const flippedX = currentX * -1;
  const yOffset = (bandwidth - tooltipDimensions.height) / 2;
  const rightAligned = chartDimensions.width - tooltipDimensions.width;

  const y = currentY - tooltipDimensions.height;
  if (flippedX - tooltipDimensions.width < 0) {
    return {
      x: rightAligned,
      y: y < 0 ? 0 : y,
    };
  }

  return {
    x: rightAligned,
    y: currentY + HORIZONTAL_GROUP_LABEL_HEIGHT + yOffset,
  };
}

function getPositiveOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, currentX, currentY, tooltipDimensions, chartDimensions} =
    props;

  const isOutside = isOutsideBounds({
    x: currentX,
    y: currentY,
    tooltipDimensions,
    chartDimensions,
  });

  const right = chartDimensions.width - tooltipDimensions.width;

  if (isOutside.top && isOutside.right) {
    return {
      x: right,
      y: 0,
    };
  }

  if (isOutside.top && !isOutside.right) {
    return {
      x: right,
      y: 0,
    };
  }

  if (!isOutside.right && !isOutside.bottom) {
    const yOffset = (bandwidth - tooltipDimensions.height) / 2;
    return {
      x: right,
      y: currentY + HORIZONTAL_GROUP_LABEL_HEIGHT + yOffset,
    };
  }

  if (isOutside.right) {
    const y =
      currentY -
      tooltipDimensions.height +
      HORIZONTAL_GROUP_LABEL_HEIGHT -
      TOOLTIP_MARGIN;

    if (y < 0) {
      return {
        x: right,
        y: bandwidth + HORIZONTAL_GROUP_LABEL_HEIGHT + TOOLTIP_MARGIN,
      };
    }

    return {
      x: right,
      y,
    };
  }

  if (isOutside.bottom) {
    return {
      x: right,
      y:
        chartDimensions.height -
        tooltipDimensions.height -
        HORIZONTAL_GROUP_LABEL_HEIGHT,
    };
  }

  return {x: currentX, y: currentY};
}

function isOutsideBounds({
  x,
  y,
  tooltipDimensions,
  chartDimensions,
}: {
  x: number;
  y: number;
  tooltipDimensions: Dimensions;
  chartDimensions: Dimensions;
}) {
  const right = x + TOOLTIP_MARGIN + tooltipDimensions.width;
  const bottom = y + tooltipDimensions.height;

  return {
    left: x <= 0,
    right: right > chartDimensions.width,
    bottom: bottom > chartDimensions.height,
    top: y <= 0,
  };
}

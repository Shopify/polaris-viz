import type {Dimensions} from 'types';

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
  const {bandwidth, currentX, currentY, tooltipDimensions} = props;

  const flippedX = currentX * -1;
  const yOffset = (bandwidth - tooltipDimensions.height) / 2;

  const y = currentY - tooltipDimensions.height;
  if (flippedX - tooltipDimensions.width < 0) {
    return {x: flippedX, y: y < 0 ? 0 : y};
  }

  return {
    x: flippedX - tooltipDimensions.width - TOOLTIP_MARGIN,
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

  if (isOutside.top && isOutside.right) {
    return {
      x: chartDimensions.width - tooltipDimensions.width,
      y: 0,
    };
  }

  if (isOutside.top && !isOutside.right) {
    return {
      x: currentX + TOOLTIP_MARGIN,
      y: 0,
    };
  }

  if (!isOutside.right && !isOutside.bottom) {
    const yOffset = (bandwidth - tooltipDimensions.height) / 2;
    return {
      x: currentX + TOOLTIP_MARGIN,
      y: currentY + HORIZONTAL_GROUP_LABEL_HEIGHT + yOffset,
    };
  }

  if (isOutside.right) {
    const x = currentX - tooltipDimensions.width;
    const y =
      currentY -
      tooltipDimensions.height +
      HORIZONTAL_GROUP_LABEL_HEIGHT -
      TOOLTIP_MARGIN;

    if (y < 0) {
      return {
        x,
        y: bandwidth + HORIZONTAL_GROUP_LABEL_HEIGHT + TOOLTIP_MARGIN,
      };
    }

    return {
      x,
      y,
    };
  }

  if (isOutside.bottom) {
    return {
      x: currentX + TOOLTIP_MARGIN,
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

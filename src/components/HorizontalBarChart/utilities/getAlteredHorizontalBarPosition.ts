import type {Dimensions} from 'types';

import {
  AlteredPositionProps,
  AlteredPositionReturn,
  TOOLTIP_MARGIN,
} from '../../../components/TooltipWrapper';
import {LABEL_HEIGHT} from '../constants';

export function getAlteredHorizontalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  if (props.currentX <= 0) {
    return getNegativeOffset(props);
  }

  return getPositiveOffset(props);
}

function getNegativeOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {bandwidth, currentX, currentY, tooltipDimensions} = props;

  const flippedX = currentX * -1;
  const yOffset = (bandwidth - tooltipDimensions.height) / 2;

  if (flippedX - tooltipDimensions.width < 0) {
    return {x: flippedX, y: currentY - tooltipDimensions.height};
  }

  return {
    x: flippedX - tooltipDimensions.width - TOOLTIP_MARGIN,
    y: currentY + LABEL_HEIGHT + yOffset,
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

  if (!isOutside.right && !isOutside.bottom) {
    const yOffset = (bandwidth - tooltipDimensions.height) / 2;
    return {
      x: currentX + TOOLTIP_MARGIN,
      y: currentY + LABEL_HEIGHT + yOffset,
    };
  }

  if (isOutside.right) {
    const x = currentX - tooltipDimensions.width;
    const y =
      currentY - tooltipDimensions.height + LABEL_HEIGHT - TOOLTIP_MARGIN;

    if (y < 0) {
      return {
        x,
        y: bandwidth + LABEL_HEIGHT + TOOLTIP_MARGIN,
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
      y: chartDimensions.height - tooltipDimensions.height - LABEL_HEIGHT,
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
    right: right > chartDimensions.width,
    bottom: bottom > chartDimensions.height,
  };
}

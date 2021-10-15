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

  const yOffset = (bandwidth - tooltipDimensions.height) / 2;

  const isOutside = isOutsideBounds({
    x: currentX,
    y: currentY,
    tooltipDimensions,
    chartDimensions,
  });

  let x = currentX;
  let y = currentY;

  if (isOutside.right) {
    x = currentX - tooltipDimensions.width;
    y = currentY - tooltipDimensions.height;
  }

  if (isOutside.bottom) {
    x = currentX;
    y = chartDimensions.height - tooltipDimensions.height + TOOLTIP_MARGIN;
  }

  if (y < 0) {
    y += bandwidth;
  }

  return {
    x: x + TOOLTIP_MARGIN,
    y: y + LABEL_HEIGHT + yOffset,
  };
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

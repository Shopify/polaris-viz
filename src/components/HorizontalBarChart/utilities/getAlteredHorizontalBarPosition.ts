import {
  AlteredPositionProps,
  AlteredPositionReturn,
  TOOLTIP_MARGIN,
} from '../../../components/TooltipWrapper';

export function getAlteredHorizontalBarPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  if (props.currentX <= 0) {
    return getNegativeOffset(props);
  }

  return getPositiveOffset(props);
}

function getNegativeOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {currentX, currentY, tooltipDimensions} = props;

  const flippedX = currentX * -1;

  if (flippedX - tooltipDimensions.width < 0) {
    return {x: flippedX, y: currentY - tooltipDimensions.height};
  }

  return {x: flippedX - tooltipDimensions.width - TOOLTIP_MARGIN, y: currentY};
}

function getPositiveOffset(props: AlteredPositionProps): AlteredPositionReturn {
  const {currentX, currentY, tooltipDimensions, chartDimensions} = props;

  if (
    currentX + TOOLTIP_MARGIN + tooltipDimensions.width >
    chartDimensions.width
  ) {
    return {
      x: currentX - tooltipDimensions.width,
      y: currentY - tooltipDimensions.height,
    };
  }

  if (currentY + tooltipDimensions.height > chartDimensions.height) {
    return {
      x: currentX,
      y: chartDimensions.height - tooltipDimensions.height + TOOLTIP_MARGIN,
    };
  }

  return {
    x: currentX + TOOLTIP_MARGIN,
    y: currentY,
  };
}

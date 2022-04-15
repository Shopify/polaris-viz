import type {Dimensions} from '@shopify/polaris-viz-core';

import {
  AlteredPositionProps,
  AlteredPositionReturn,
  TOOLTIP_MARGIN,
} from '../components';

export function getAlteredLineChartPosition(
  props: AlteredPositionProps,
): AlteredPositionReturn {
  let x = props.currentX - props.tooltipDimensions.width - TOOLTIP_MARGIN;

  const {left: isOutsideLeft} = isOutsideBounds({
    x,
    y: 0,
    tooltipDimensions: props.tooltipDimensions,
    chartDimensions: props.chartDimensions,
  });

  if (isOutsideLeft) {
    x = props.currentX + TOOLTIP_MARGIN;
  }

  return {x, y: props.margin.Top};
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

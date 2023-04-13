import {clamp} from '@shopify/polaris-viz-core';

import {HOVER_TARGET_ZONE} from '../constants';

export interface Props {
  barSize: number;
  zeroPosition: number;
  max: number;
  position: 'vertical' | 'horizontal';
}

export function getHoverZoneOffset({
  barSize,
  zeroPosition,
  max,
  position,
}: Props) {
  let offset = HOVER_TARGET_ZONE;
  const chartMaxSize = max - zeroPosition;
  const chartNegativeMaxSize = max - chartMaxSize;

  if (position === 'horizontal') {
    if (barSize + offset >= chartMaxSize) {
      offset = chartMaxSize - barSize;
    }
  } else if (barSize + offset >= chartNegativeMaxSize) {
    offset = chartNegativeMaxSize - barSize;
  }

  const clampedSize = clamp({
    amount: barSize + offset,
    min: barSize,
    max,
  });

  return {clampedSize, offset};
}

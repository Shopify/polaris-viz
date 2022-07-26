import {clamp} from '@shopify/polaris-viz-core';

import {HOVER_TARGET_ZONE} from '../constants';

interface Props {
  barSize: number;
  zeroPosition: number;
  max: number;
  position: 'vertical' | 'horizontal';
  isNegative: boolean;
}

export function getHoverZoneOffset({
  barSize,
  zeroPosition,
  max,
  isNegative,
  position,
}: Props) {
  let offset = HOVER_TARGET_ZONE;
  const chartMaxSize = max - zeroPosition;
  const chartNegativeMaxSize = max - chartMaxSize;
  let clampedSize;

  if (position === 'horizontal') {
    if (barSize + offset >= chartMaxSize) {
      offset = chartMaxSize - barSize;
    }
  } else if (barSize + offset >= chartNegativeMaxSize) {
    offset = chartNegativeMaxSize - barSize;
  }

  if (isNegative) {
    clampedSize = clamp({
      amount: barSize + offset,
      min: barSize,
      max,
    });
  } else {
    clampedSize = clamp({
      amount: barSize + offset,
      min: barSize,
      max: max - zeroPosition,
    });
  }

  return {clampedSize, offset};
}

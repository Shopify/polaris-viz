import type {ScaleLinear} from 'd3-scale';

import {MIN_BAR_HEIGHT} from '../../../constants';

export function getFunnelBarHeight(
  rawValue: number,
  yScale: ScaleLinear<number, number>,
) {
  const rawHeight = Math.abs(yScale(rawValue) - yScale(0));
  const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;

  return needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
}

import type {ScaleLinear} from 'd3-scale';

import type {Gaps} from '../types';

import {getGapForIndex} from '.';

interface Props {
  start: number;
  end: number;
  seriesIndex: number;
  gaps: Gaps;
  xScale: ScaleLinear<number, number>;
}
export function getXPosition({start, end, seriesIndex, gaps, xScale}: Props) {
  if (start < 0 && start !== 0) {
    return (
      xScale(start) - getGapForIndex({gaps, direction: 'negative', seriesIndex})
    );
  }

  if (end > 0) {
    return (
      xScale(start) + getGapForIndex({gaps, direction: 'positive', seriesIndex})
    );
  }

  return xScale(start);
}

import type {ScaleLinear} from 'd3-scale';

import type {StackedBarGapDirections} from '../../../types';
import {getGapForIndex} from '../../../utilities/getGapForIndex';

interface Props {
  start: number;
  end: number;
  groupIndex: number;
  gaps: StackedBarGapDirections;
  yScale: ScaleLinear<number, number>;
}

export function getYPosition({start, end, groupIndex, gaps, yScale}: Props) {
  if (start < 0) {
    return (
      yScale(end) +
      getGapForIndex({gaps, direction: 'negative', seriesIndex: groupIndex})
    );
  }

  if (end > 0) {
    return (
      yScale(end) -
      getGapForIndex({gaps, direction: 'positive', seriesIndex: groupIndex})
    );
  }

  return 0;
}

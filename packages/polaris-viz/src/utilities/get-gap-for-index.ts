import type {StackedBarGapDirections} from '../types';

interface Props {
  gaps: StackedBarGapDirections;
  direction: 'positive' | 'negative';
  seriesIndex: number;
}

export function getGapForIndex({gaps, direction, seriesIndex}: Props) {
  return gaps[direction].find(({index}) => index === seriesIndex)?.gap ?? 0;
}

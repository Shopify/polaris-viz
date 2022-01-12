import type {Gaps} from '../types';

interface Props {
  gaps: Gaps;
  direction: 'positive' | 'negative';
  seriesIndex: number;
}

export function getGapForIndex({gaps, direction, seriesIndex}: Props) {
  return gaps[direction].find(({index}) => index === seriesIndex)?.gap ?? 0;
}

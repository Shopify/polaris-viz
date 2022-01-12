import {useMemo} from 'react';

import type {FormattedStackedSeries} from '../../../../types';
import type {Gaps} from '../types';

const STACKED_BAR_GAP = 2;
interface Props {
  stackedValues: FormattedStackedSeries;
  groupIndex: number;
}

export function useStackedGaps({stackedValues, groupIndex}: Props) {
  return useMemo(() => {
    const gaps: Gaps = {
      positive: [],
      negative: [],
    };

    stackedValues[groupIndex].forEach(([start, end], index) => {
      if (end > 0) {
        pushGapToArray({gaps, index, direction: 'positive', firstGapValue: 0});
      }
      if (start < 0) {
        pushGapToArray({
          gaps,
          index,
          direction: 'negative',
          firstGapValue: STACKED_BAR_GAP,
        });
      }
    });
    return gaps;
  }, [groupIndex, stackedValues]);
}

interface PushGapToArrayProps {
  gaps: Gaps;
  index: number;
  direction: 'positive' | 'negative';
  firstGapValue: number;
}

function pushGapToArray({
  gaps,
  index,
  direction,
  firstGapValue,
}: PushGapToArrayProps) {
  if (!gaps[direction][gaps[direction].length - 1]) {
    gaps[direction].push({index, gap: firstGapValue});
    return;
  }
  const {gap} = gaps[direction][gaps[direction].length - 1];
  gaps[direction].push({index, gap: gap + STACKED_BAR_GAP});
}

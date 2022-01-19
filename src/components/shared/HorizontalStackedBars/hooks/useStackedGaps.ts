import {useMemo} from 'react';

import {STACKED_BAR_GAP} from '../../../../constants';
import {pushGapToArray} from '../../../../utilities';
import type {
  FormattedStackedSeries,
  StackedBarGapDirections,
} from '../../../../types';

interface Props {
  stackedValues: FormattedStackedSeries;
  groupIndex: number;
}

export function useStackedGaps({stackedValues, groupIndex}: Props) {
  return useMemo(() => {
    const gaps: StackedBarGapDirections = {
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

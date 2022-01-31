import type {
  FormattedStackedSeries,
  StackedBarGapDirections,
  StackedSeries,
} from 'types';

import {STACKED_BAR_GAP} from '../../../constants';
import {pushGapToArray} from '../../../utilities';

// Note: Because horizontal and vertical bar charts render the bars
// differently, we need two different methods until we can refactor
export function useStackedGapsForVerticalChart({
  stackedValues,
  labels,
}: {
  stackedValues: StackedSeries[] | null;
  labels: string[];
}) {
  if (stackedValues == null) {
    return [];
  }

  const formattedStackedValues: FormattedStackedSeries = labels.map(
    (_, labelIndex) => {
      return stackedValues.map((data) => {
        return data[labelIndex];
      });
    },
  );

  const groupedGaps: {[key: number]: StackedBarGapDirections} = {};

  formattedStackedValues.map((group, groupIndex) => {
    const gaps: StackedBarGapDirections = {
      positive: [],
      negative: [],
    };

    const areAllNegative = !group.some(([start, end]) => {
      return start + end > 0;
    });

    group.forEach(([start, end], index) => {
      if (end > 0) {
        pushGapToArray({gaps, index, direction: 'positive', firstGapValue: 0});
      }
      if (start < 0) {
        pushGapToArray({
          gaps,
          index,
          direction: 'negative',
          firstGapValue: areAllNegative ? 0 : STACKED_BAR_GAP,
        });
      }
    });

    groupedGaps[groupIndex] = gaps;
  });

  return groupedGaps;
}

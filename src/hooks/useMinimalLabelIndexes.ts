import {useMemo} from 'react';

import type {DataSeries} from '../types';

export interface Props {
  data: DataSeries[];
  useMinimalLabels?: boolean;
}

export function useMinimalLabelIndexes({data, useMinimalLabels}: Props) {
  const longestSeriesLastIndex = useMemo(
    () =>
      data.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [data],
  );

  const {minimalLabelIndexes} = useMemo(() => {
    if (!useMinimalLabels) {
      return {minimalLabelIndexes: []};
    }

    return {
      minimalLabelIndexes: [
        0,
        Math.floor(longestSeriesLastIndex / 2),
        longestSeriesLastIndex,
      ],
    };
  }, [longestSeriesLastIndex, useMinimalLabels]);

  return {
    minimalLabelIndexes,
  };
}

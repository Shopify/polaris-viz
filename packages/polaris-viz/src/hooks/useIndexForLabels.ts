import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

export function useIndexForLabels(data: DataSeries[]) {
  return useMemo(() => {
    return data.reduce((longestIndex, currentSeries, index, array) => {
      const previousSeries = array[index - 1];

      if (
        previousSeries &&
        previousSeries.data.length < currentSeries.data.length
      ) {
        return index;
      }

      return longestIndex;
    }, 0);
  }, [data]);
}

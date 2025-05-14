import {useMemo} from 'react';
import type {LineChartDataSeriesWithDefaults} from '@shopify/polaris-viz-core';

export function useFormatData(data: LineChartDataSeriesWithDefaults[]) {
  const longestSeriesIndex = useMemo(
    () =>
      data.reduce((maxIndex, currentSeries, currentIndex) => {
        return data[maxIndex].data.length < currentSeries.data.length
          ? currentIndex
          : maxIndex;
      }, 0),
    [data],
  );

  const longestSeriesLength = data[longestSeriesIndex]
    ? data[longestSeriesIndex].data.length - 1
    : 0;

  return {longestSeriesLength, longestSeriesIndex};
}

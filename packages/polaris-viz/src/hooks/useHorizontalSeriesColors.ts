import {useMemo} from 'react';
import {getSeriesColors, useTheme} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';

export function useHorizontalSeriesColors(data: DataSeries[]) {
  const selectedTheme = useTheme();

  const longestSeriesIndex = useMemo(
    () =>
      data.reduce((maxIndex, currentSeries, currentIndex) => {
        return data[maxIndex].data.length < currentSeries.data.length
          ? currentIndex
          : maxIndex;
      }, 0),
    [data],
  );

  const longestSeriesCount = useMemo(() => {
    return data[longestSeriesIndex].data.length;
  }, [data, longestSeriesIndex]);

  const seriesColors = useMemo(() => {
    const nonComparison = data.filter(
      ({isComparison}) => isComparison !== true,
    );

    const seriesColors = getSeriesColors(nonComparison.length, selectedTheme);

    data.forEach(({color, isComparison}, index) => {
      let newColor;

      if (isComparison) {
        newColor = selectedTheme.seriesColors.comparison;
      } else if (color != null) {
        newColor = color;
      }

      if (newColor) {
        seriesColors.splice(index, 0, newColor);
      }
    });

    return seriesColors.slice(0, data.length);
  }, [data, selectedTheme]);

  return {longestSeriesCount, seriesColors, longestSeriesIndex};
}

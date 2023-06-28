import {useMemo} from 'react';
import {getSeriesColors, useTheme} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';

export function useHorizontalSeriesColors(data: DataSeries[]) {
  const selectedTheme = useTheme();

  const longestSeriesCount = useMemo(() => {
    return data.reduce((prev, cur) => {
      const count = cur.data.length;

      return count > prev ? count : prev;
    }, 0);
  }, [data]);

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

  return {longestSeriesCount, seriesColors};
}

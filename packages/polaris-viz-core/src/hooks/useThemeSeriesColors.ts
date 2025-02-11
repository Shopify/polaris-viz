import {useMemo} from 'react';

import {getFilteredSeries, getSeriesColors} from '../utilities';
import {getComparisonSeriesIndexes} from '../utilities/getComparisonSeriesIndexes';
import type {Theme, Color, DataSeries} from '../types';

// Build an array of colors for each item in the series. Colors provided directly
// to series.color are used in place of the theme color.
export function useThemeSeriesColors(
  series: Partial<DataSeries>[],
  selectedTheme: Theme,
): Color[] {
  return useMemo(() => {
    const comparisonSeriesIndexes = getComparisonSeriesIndexes(series);

    const seriesCount = getFilteredSeries(series);
    const seriesColors = getSeriesColors(seriesCount, selectedTheme);

    let lastUsedColorIndex = -1;

    const colors = series.map(({color, isComparison}) => {
      if (isComparison === true) {
        return selectedTheme.seriesColors.comparison;
      }

      // If the series doesn't have a color property
      // explicitly set on itself, we're going to grab
      // the next available color in the array.
      if (!color) {
        lastUsedColorIndex += 1;

        // Once we've hit the last item in the array,
        // reset the count and grab the first color.
        if (lastUsedColorIndex === seriesColors.length) {
          lastUsedColorIndex = 0;
        }

        return seriesColors[lastUsedColorIndex];
      }

      return color;
    });

    // Apply the same color from the original series to the comparison series.
    if (comparisonSeriesIndexes.length > 0) {
      comparisonSeriesIndexes.forEach(({originalIndex, comparisonIndex}) => {
        colors[comparisonIndex] = colors[originalIndex];
      });
    }

    return colors;
  }, [series, selectedTheme]);
}

import {useMemo} from 'react';
import type {
  Theme,
  Color,
  DataSeries,
  DataPoint,
} from '@shopify/polaris-viz-core';
import {getSeriesColors} from '@shopify/polaris-viz-core';

interface ValidData {
  data: (DataPoint | DataSeries)[];
  color?: Color;
  isComparison?: boolean;
  name?: string;
}

function getFilteredSeriesCount(series: Partial<ValidData>[]): number {
  // Only include solid lines (or non-lines) in the
  // count when grabbing the series color.
  return (
    series.filter((item) => {
      return item.isComparison !== true;
    }).length ?? 0
  );
}

// Build an array of colors for each item in the series. Colors provided directly
// to series.color are used in place of the theme color.
export function useThemeSeriesColors(
  series: Partial<ValidData>[],
  selectedTheme: Theme,
): Color[] {
  return useMemo(() => {
    const seriesCount = getFilteredSeriesCount(series);
    const seriesColors = getSeriesColors(seriesCount, selectedTheme);

    let lastUsedColorIndex = -1;

    return series.map(({color, isComparison}) => {
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
  }, [series, selectedTheme]);
}

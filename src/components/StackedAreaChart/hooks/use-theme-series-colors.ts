import {useMemo} from 'react';

import type {Theme, Color} from '../../../types';
import type {Series} from '../types';

// Build an array of colors for each item in the series. Colors provided directly
// to series.color are used in place of the theme color.
export function useThemeSeriesColors(
  series: Series[],
  selectedTheme: Theme,
): Color[] {
  return useMemo(() => {
    const seriesColors = getSeriesColors(series.length, selectedTheme);

    let lastUsedColorIndex = -1;

    return series.map(({color}) => {
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

export function getSeriesColors(count: number, selectedTheme: Theme): Color[] {
  if (count <= 4) {
    return selectedTheme.seriesColors.upToFour;
  }

  if (count >= 5 && count <= 7) {
    return selectedTheme.seriesColors.fromFiveToSeven;
  }

  return selectedTheme.seriesColors.all;
}

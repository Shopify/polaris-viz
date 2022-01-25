import {useMemo} from 'react';

import type {Theme, Color, LineStyle, DataPoint, Data} from '../types';

// Note: This is a bandaid until all component are using
// the new DataSeries type.
interface ValidData {
  data: (DataPoint | Data)[];
  color?: Color;
  isComparison?: boolean;
  name?: string;

  lineStyle?: LineStyle;
}

function getFilteredSeriesCount(series: Partial<ValidData>[]): number {
  // Only include solid lines (or non-lines) in the
  // count when grabbing the series color.
  return (
    series.filter((item) => {
      if (item.isComparison !== true && !item.lineStyle) {
        return true;
      }
      return item.lineStyle === 'solid';
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

    return series.map(({color, lineStyle, isComparison}) => {
      if (isComparison === true || (lineStyle && lineStyle !== 'solid')) {
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

export function getSeriesColorsFromCount(
  count: number,
  selectedTheme: Theme,
): Color[] {
  const seriesColors = getSeriesColors(count, selectedTheme);

  let lastUsedColorIndex = -1;

  return [...Array.from({length: count})].map(() => {
    lastUsedColorIndex += 1;

    // Once we've hit the last item in the array,
    // reset the count and grab the first color.
    if (lastUsedColorIndex === seriesColors.length) {
      lastUsedColorIndex = 0;
    }

    return seriesColors[lastUsedColorIndex];
  });
}

export function getSeriesColors(count: number, selectedTheme: Theme): Color[] {
  if (count === 1) {
    return [selectedTheme.seriesColors.single];
  }

  if (count <= 4) {
    return selectedTheme.seriesColors.upToFour;
  }

  if (count >= 5 && count <= 7) {
    return selectedTheme.seriesColors.fromFiveToSeven;
  }

  return selectedTheme.seriesColors.all;
}

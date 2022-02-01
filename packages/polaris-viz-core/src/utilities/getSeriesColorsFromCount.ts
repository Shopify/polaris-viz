import {Theme, Color} from '../types';

import {getSeriesColors} from './getSeriesColors';

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

import type {Theme, Color} from '../types';

export function getSeriesColors(count: number, selectedTheme: Theme): Color[] {
  if (count === 1) {
    return [selectedTheme.seriesColors.single];
  }

  if (count <= 4) {
    return [...selectedTheme.seriesColors.upToFour];
  }

  if (count >= 5 && count <= 7) {
    return [...selectedTheme.seriesColors.fromFiveToSeven];
  }

  const allColors = [...selectedTheme.seriesColors.all];

  if (count <= allColors.length) {
    return allColors;
  }

  let lastUsedColorIndex = -1;

  return [...Array.from({length: count})].map(() => {
    lastUsedColorIndex += 1;

    // Once we've hit the last item in the array,
    // reset the count and grab the first color.
    if (lastUsedColorIndex === allColors.length) {
      lastUsedColorIndex = 0;
    }

    return allColors[lastUsedColorIndex];
  });
}

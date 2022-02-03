import type {Theme, Color} from '../types';

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

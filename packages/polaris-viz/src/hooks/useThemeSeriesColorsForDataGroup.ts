import type {DataGroup, DataSeries, Theme} from '@shopify/polaris-viz-core';

import {useThemeSeriesColors} from './useThemeSeriesColors';

export function useThemeSeriesColorsForDataGroup(
  data: DataGroup[],
  selectedTheme: Theme,
) {
  const series = data.reduce<DataSeries[]>((previous, {series}) => {
    return previous.concat(series);
  }, []);

  return useThemeSeriesColors(series, selectedTheme);
}

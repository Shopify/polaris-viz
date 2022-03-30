import type {DataGroup, Theme} from '@shopify/polaris-viz-core';

import {flattenDataGroupToDataSeries} from '../utilities/flattenDataGroupToDataSeries';

import {useThemeSeriesColors} from './useThemeSeriesColors';

export function useThemeSeriesColorsForDataGroup(
  data: DataGroup[],
  selectedTheme: Theme,
) {
  const series = flattenDataGroupToDataSeries(data);

  return useThemeSeriesColors(series, selectedTheme);
}

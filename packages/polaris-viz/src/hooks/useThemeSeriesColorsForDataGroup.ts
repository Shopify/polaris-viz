import type {DataGroup, Theme} from '@shopify/polaris-viz-core';
import {useThemeSeriesColors} from '@shopify/polaris-viz-core';

import {flattenDataGroupToDataSeries} from '../utilities/flattenDataGroupToDataSeries';

export function useThemeSeriesColorsForDataGroup(
  data: DataGroup[],
  selectedTheme: Theme,
) {
  const series = flattenDataGroupToDataSeries(data);

  return useThemeSeriesColors(series, selectedTheme);
}

import {useMemo} from 'react';

import type {DataSeries} from '../types';

import {getSeriesColorsFromCount} from './use-theme-series-colors';
import {useTheme} from './useTheme';

interface Props {
  data: DataSeries[];
  formattedData: DataSeries[];
  theme?: string;
}

export function useHorizontalSeriesColors({data, formattedData, theme}: Props) {
  const selectedTheme = useTheme(theme);

  const longestSeriesCount = useMemo(() => {
    return formattedData.reduce((prev, cur) => {
      const count = cur.data.length;

      return count > prev ? count : prev;
    }, 0);
  }, [formattedData]);

  const seriesColors = useMemo(() => {
    const seriesColors = getSeriesColorsFromCount(
      longestSeriesCount,
      selectedTheme,
    );

    data.forEach(({color}, index) => {
      if (color != null) {
        seriesColors.splice(index, 0, color);
        // Remove the extra seriesColor from the
        // end of the array so we're not rendering
        // unused defs
        seriesColors.pop();
      }
    });

    return seriesColors;
  }, [longestSeriesCount, data, selectedTheme]);

  return {longestSeriesCount, seriesColors};
}

import {useMemo} from 'react';

import type {DataSeries} from '../types';

import {getSeriesColorsFromCount} from './use-theme-series-colors';
import {useTheme} from './useTheme';

interface Props {
  series: DataSeries[];
  formattedSeries: DataSeries[];
  theme?: string;
}

export function useHorizontalSeriesColors({
  series,
  formattedSeries,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const longestSeriesCount = useMemo(() => {
    return formattedSeries.reduce((prev, cur) => {
      const count = cur.data.length;

      return count > prev ? count : prev;
    }, 0);
  }, [formattedSeries]);

  const seriesColors = useMemo(() => {
    const seriesColors = getSeriesColorsFromCount(
      longestSeriesCount,
      selectedTheme,
    );

    series.forEach(({color}, index) => {
      if (color != null) {
        seriesColors.splice(index, 0, color);
        // Remove the extra seriesColor from the
        // end of the array so we're not rendering
        // unused defs
        seriesColors.pop();
      }
    });

    return seriesColors;
  }, [longestSeriesCount, series, selectedTheme]);

  return {longestSeriesCount, seriesColors};
}

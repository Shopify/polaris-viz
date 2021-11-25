import {useMemo} from 'react';

import type {DataSeries} from '../types';

import {getSeriesColorsFromCount} from './use-theme-series-colors';
import {useTheme} from './useTheme';

interface Props {
  data: DataSeries[];
  theme?: string;
}

export function useHorizontalSeriesColors({data, theme}: Props) {
  const selectedTheme = useTheme(theme);

  const longestSeriesCount = useMemo(() => {
    return data.reduce((prev, cur) => {
      const count = cur.data.length;

      return count > prev ? count : prev;
    }, 0);
  }, [data]);

  const seriesColors = useMemo(() => {
    const seriesColors = getSeriesColorsFromCount(data.length, selectedTheme);

    data.forEach(({color, isComparison}, index) => {
      let newColor;

      if (isComparison) {
        newColor = selectedTheme.line.dottedStrokeColor;
      } else if (color != null) {
        newColor = color;
      }

      if (newColor) {
        seriesColors.splice(index, 0, newColor);
        // Remove the extra seriesColor from the
        // end of the array so we're not rendering
        // unused defs
        seriesColors.pop();
      }
    });

    return seriesColors;
  }, [data, selectedTheme]);

  return {longestSeriesCount, seriesColors};
}

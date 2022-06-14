import {useMemo} from 'react';

import {yAxisMinMax} from '../../LineChart/utilities';
import {
  getStackedMinMax,
  getYAxisOptionsWithDefaults,
} from '../../../utilities';
import type {ComboChartDataSeries, Axis} from '../types';

export function useGetDualAxis({data}: {data: ComboChartDataSeries[]}): Axis[] {
  return useMemo(() => {
    return data.map((series, index) => {
      let min;
      let max;

      const yAxisOptions = getYAxisOptionsWithDefaults(series.yAxisOptions);

      switch (series.shape) {
        case 'Line': {
          const {minY, maxY} = yAxisMinMax(series.series);

          min = minY;
          max = maxY;
          break;
        }
        case 'Bar': {
          const {min: yMin, max: yMax} = getStackedMinMax({
            stackedValues: null,
            data: series.series,
            integersOnly: yAxisOptions.integersOnly,
          });

          min = yMin;
          max = yMax;
          break;
        }
      }

      const areAllValuesNegative = min <= 0 && max <= 0;
      const areSomeValuesNegative = min < 0 || max < 0;

      return {
        min,
        max,
        areAllValuesNegative,
        areSomeValuesNegative,
        index,
        shape: series.shape,
        yAxisOptions,
      };
    });
  }, [data]);
}

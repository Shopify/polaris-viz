import {useMemo} from 'react';

import {yAxisMinMax} from '../../LineChart/utilities';
import {getStackedMinMax} from '../../../utilities';
import type {MixedChartDataSeries, Axis} from '../types';

export function useGetDualAxis({data}: {data: MixedChartDataSeries[]}): Axis[] {
  return useMemo(() => {
    return data.map((series, index) => {
      let min;
      let max;

      switch (series.shape) {
        case 'Line': {
          const [yMin, yMax] = yAxisMinMax({
            data: series.series,
            integersOnly: false,
            // integersOnly: yAxisOptions.integersOnly,
          });

          min = yMin;
          max = yMax;
          break;
        }
        case 'Bar': {
          const {min: yMin, max: yMax} = getStackedMinMax({
            stackedValues: null,
            data: series.series,
            integersOnly: false,
            // integersOnly: yAxisOptions.integersOnly,
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
      };
    });
  }, [data]);
}

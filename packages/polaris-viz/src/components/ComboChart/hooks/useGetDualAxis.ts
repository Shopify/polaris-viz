import {useMemo} from 'react';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {yAxisMinMax} from '../../LineChart/utilities';
import {
  getStackedMinMax,
  getYAxisOptionsWithDefaults,
} from '../../../utilities';
import {Axis, AxisValueRange} from '../types';

export function useGetDualAxis({data}: {data: DataGroup[]}): Axis[] {
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

      return {
        valuesRange: getValuesRange(min, max),
        min,
        max,
        index,
        shape: series.shape,
        yAxisOptions,
      };
    });
  }, [data]);
}

function getValuesRange(min, max) {
  if (min <= 0 && max <= 0) {
    return AxisValueRange.AllNegative;
  } else if (min < 0 || max < 0) {
    return AxisValueRange.SomeNegative;
  } else {
    return AxisValueRange.AllPositive;
  }
}

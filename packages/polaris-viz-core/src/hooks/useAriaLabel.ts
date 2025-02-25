import {useCallback} from 'react';

import type {DataSeries, LabelFormatter} from '../types';

interface UseAriaLabelOptions {
  xAxisLabelFormatter?: LabelFormatter;
  yAxisLabelFormatter?: LabelFormatter;
}

interface GetAriaLabelProps {
  seriesIndex: number;
  key?: string | number;
}

export function useAriaLabel(
  data: DataSeries[],
  options: UseAriaLabelOptions = {
    xAxisLabelFormatter: undefined,
    yAxisLabelFormatter: undefined,
  },
) {
  return useCallback(
    function getAriaLabel({seriesIndex, key}: GetAriaLabelProps) {
      const {xAxisLabelFormatter, yAxisLabelFormatter} = options;
      const ariaSeries = data
        .map(({name, data}) =>
          data[seriesIndex]
            ? `${name} ${
                xAxisLabelFormatter
                  ? xAxisLabelFormatter(data[seriesIndex].value)
                  : data[seriesIndex].value
              }`
            : '',
        )
        .join(', ');

      return key
        ? `${
            yAxisLabelFormatter ? yAxisLabelFormatter(key) : key
          }: ${ariaSeries}`
        : '';
    },
    [data, options],
  );
}

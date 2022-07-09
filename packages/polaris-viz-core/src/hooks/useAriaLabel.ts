import {useCallback} from 'react';
import type {DataSeries, LabelFormatter} from 'types';

interface UseAriaLabelOptions {
  xAxisLabelFormatter: LabelFormatter;
  yAxisLabelFormatter?: LabelFormatter;
}

interface GetAriaLabelProps {
  seriesIndex: number;
  key?: string | number;
}

export function useAriaLabel(data: DataSeries[], options: UseAriaLabelOptions) {
  return useCallback(
    function getAriaLabel({seriesIndex, key}: GetAriaLabelProps) {
      const {xAxisLabelFormatter, yAxisLabelFormatter} = options;
      const ariaSeries = data
        .map(({name, data}) =>
          data[seriesIndex]
            ? `${name} ${xAxisLabelFormatter(data[seriesIndex].value)}`
            : '',
        )
        .join(', ');

      if (!yAxisLabelFormatter) {
        return key ? `${key}: ${ariaSeries}` : '';
      }

      return key ? `${yAxisLabelFormatter(key)}: ${ariaSeries}` : '';
    },
    [data, options],
  );
}

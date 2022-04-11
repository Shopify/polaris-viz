import {useMemo} from 'react';
import type {DataSeries, XAxisOptions} from '@shopify/polaris-viz-core';

interface Props {
  data: DataSeries[];
  xAxisOptions: Required<XAxisOptions>;
}

export function useXAxisLabels({data, xAxisOptions}: Props) {
  return useMemo(() => {
    const labels: string[] = [];

    if (data == null || data.length === 0) {
      return [];
    }

    data.forEach((series) => {
      if (series == null || series.data == null) {
        return;
      }

      series.data.forEach(({key}, index) => {
        labels[index] = xAxisOptions.labelFormatter?.(`${key}`) ?? `${key}`;
      });
    });

    return labels;
  }, [data, xAxisOptions]);
}

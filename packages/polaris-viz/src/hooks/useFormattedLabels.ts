import {useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

interface Props {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
}

export function useFormattedLabels({data, labelFormatter}: Props) {
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
        labels[index] = labelFormatter?.(`${key}`) ?? `${key}`;
      });
    });

    return labels;
  }, [data, labelFormatter]);
}

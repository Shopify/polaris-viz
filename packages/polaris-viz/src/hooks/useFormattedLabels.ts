import {useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

interface Props {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
}

export function useFormattedLabels({data, labelFormatter}: Props) {
  return useMemo(() => {
    const formattedLabels: string[] = [];
    const unformattedLabels: string[] = [];

    if (data == null || data.length === 0) {
      return {formattedLabels, unformattedLabels};
    }

    data.forEach((series) => {
      if (series == null || series.data == null) {
        return;
      }

      series.data.forEach(({key}, index) => {
        formattedLabels[index] = labelFormatter?.(`${key}`) ?? `${key}`;
        unformattedLabels[index] = `${key}`;
      });
    });

    return {formattedLabels, unformattedLabels};
  }, [data, labelFormatter]);
}

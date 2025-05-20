import {useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

interface Props {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
  indexToKeep?: number[];
}

export function useFormattedLabels({data, labelFormatter, indexToKeep}: Props) {
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
        formattedLabels[index] = indexToKeep?.includes(index)
          ? labelFormatter?.(`${key}`) ?? `${key}`
          : '';
        unformattedLabels[index] = indexToKeep?.includes(index) ? `${key}` : '';
      });
    });

    return {formattedLabels, unformattedLabels};
  }, [data, indexToKeep, labelFormatter]);
}

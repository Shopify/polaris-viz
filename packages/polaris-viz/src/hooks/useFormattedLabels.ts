import {useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

interface Props {
  data: DataSeries[];
  labelFormatter: LabelFormatter;
}

export function useFormattedLabels({data, labelFormatter}: Props) {
  return useMemo(() => {
    const formattedLabels: Set<string> = new Set([]);
    const unformattedLabels: Set<string> = new Set([]);

    if (data == null || data.length === 0) {
      return {formattedLabels: [], unformattedLabels: []};
    }

    data.forEach((series) => {
      if (series == null || series.data == null) {
        return;
      }

      series.data.forEach(({key}) => {
        formattedLabels.add(labelFormatter?.(`${key}`) ?? `${key}`);
        unformattedLabels.add(`${key}`);
      });
    });

    return {
      formattedLabels: [...formattedLabels],
      unformattedLabels: [...unformattedLabels],
    };
  }, [data, labelFormatter]);
}

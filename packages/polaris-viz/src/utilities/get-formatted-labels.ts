import type {DataSeries} from '@shopify/polaris-viz-core';

import type {StringLabelFormatter} from '../types';

export function getFormattedLabels({
  data,
  labelFormatter,
}: {
  data: DataSeries[];
  labelFormatter: StringLabelFormatter;
}) {
  const labels: string[] = [];

  data.forEach(({data}) => {
    data.forEach(({key}, index) => {
      labels[index] = labelFormatter?.(`${key}`) ?? `${key}`;
    });
  });

  return labels;
}

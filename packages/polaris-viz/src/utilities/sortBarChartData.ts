import type {DataSeries} from '@shopify/polaris-viz-core';

export function sortBarChartData(labels: string[], data: DataSeries[]) {
  return labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter((value) => value !== null) as number[];
  });
}

import type {DataSeries} from '@shopify/polaris-viz-core';

export function sortBarChartData(labels: string[], data: DataSeries[]) {
  return labels.map((_, index) => {
    return data.map((type) => {
      const value = type.data[index]?.value;
      if (value !== null && isNaN(Number(value))) {
        return null;
      }

      return value;
    });
  });
}

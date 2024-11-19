import type {DataSeries} from '@shopify/polaris-viz-core';

export function sortBarChartData(data: DataSeries[]) {
  if (data.length === 0) {
    return [];
  }

  const labels = data[0].data.map(({key}) => key);

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

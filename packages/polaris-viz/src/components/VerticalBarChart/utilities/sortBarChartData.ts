import type {Color, DataSeries} from '@shopify/polaris-viz-core';

export function sortBarChartData(
  data: DataSeries[],
  labels: string[],
  colors: Color[],
) {
  if (data.length === 0) {
    return [];
  }

  const dataSeries = [];

  labels.forEach((label) => {
    dataSeries.push({name: label, data: []});
  });

  data.forEach((series, seriesIndex) => {
    if (series.data == null) {
      return;
    }

    series.data.forEach(({key, value}, index) => {
      if (value !== null && isNaN(Number(value))) {
        return;
      }

      if (value == null) {
        return;
      }

      dataSeries[index].data.push({
        key: series.name,
        seriesIndex,
        value,
        color: colors[seriesIndex],
      });
    });
  });

  return dataSeries;
}

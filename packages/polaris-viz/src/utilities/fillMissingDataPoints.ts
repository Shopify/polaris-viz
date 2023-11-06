import type {DataSeries} from '@shopify/polaris-viz-core';

export function fillMissingDataPoints(dataSeries: DataSeries[]) {
  const allKeys = new Set<string>();
  const dataValueMap: {[key: number]: {[key: string]: number | null}} = {};

  for (const [index, {data}] of dataSeries.entries()) {
    for (const {key, value} of data) {
      allKeys.add(`${key}`);

      if (dataValueMap[index] == null) {
        dataValueMap[index] = {};
      }

      dataValueMap[index][key] = value;
    }
  }

  return dataSeries.map(({name}, index) => {
    const newData = [...allKeys].map((key) => {
      return {
        key,
        value: dataValueMap[index][key] ?? null,
      };
    });
    return {name, data: newData};
  });
}

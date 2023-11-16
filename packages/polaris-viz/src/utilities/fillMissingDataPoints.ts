import type {DataSeries} from '@shopify/polaris-viz-core';

export function fillMissingDataPoints(dataSeries: DataSeries[]) {
  const areAnyComparrison = dataSeries.some(
    ({isComparison}) => isComparison === true,
  );

  if (areAnyComparrison) {
    return dataSeries;
  }

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

  return dataSeries.map((series, index) => {
    const newData = [...allKeys].map((key) => {
      const dataValue = dataValueMap[index];

      return {
        key,
        value: dataValue == null ? null : dataValue[key] ?? null,
      };
    });
    return {...series, data: newData};
  });
}

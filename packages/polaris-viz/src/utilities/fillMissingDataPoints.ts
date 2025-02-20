import type {DataSeries} from '@shopify/polaris-viz-core';

export function fillMissingDataPoints(
  dataSeries: DataSeries[],
  isLinearData: boolean,
): DataSeries[] {
  if (isLinearData) {
    const areAnyComparison = dataSeries.some(
      ({isComparison}) => isComparison === true,
    );

    if (areAnyComparison) {
      return dataSeries;
    }
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
      const fillValue =
        series.fillValue !== undefined ? series.fillValue : null;
      return {
        key,
        value: dataValue == null ? null : dataValue[key] ?? fillValue,
      };
    });
    return {...series, data: newData};
  });
}

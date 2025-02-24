import type {DataSeries} from '@shopify/polaris-viz-core';

import {formatDataIntoGroups} from './formatDataIntoGroups';

export function getHighestValueForSeries(
  data: DataSeries[],
  areAllNegative: boolean,
) {
  const groups = formatDataIntoGroups(data);

  const maxes = groups.map((numbers) => {
    const values = numbers.map((value) => value).filter(Boolean) as number[];

    if (values.length === 0) {
      return 0;
    }

    return areAllNegative ? Math.min(...values) : Math.max(...values);
  });

  return maxes;
}

export function getHighestValueIndexForSeries(data: DataSeries[]) {
  const highestValues = getHighestValueForSeries(data, false);

  const indexes = {};

  data.forEach((series, seriesIndex) => {
    series.data.forEach(({value}, dataIndex) => {
      const highestValue = highestValues[dataIndex];

      if (value === highestValue) {
        indexes[dataIndex] = seriesIndex;
      }
    });
  });

  return indexes;
}

import type {DataSeries} from '@shopify/polaris-viz-core';
import {stackOrderNone, stackOffsetDiverging} from 'd3-shape';

import {getStackedValues} from './';

export function getStackedValuesFromDataSeries(data: DataSeries[]) {
  const longestSeries = data.reduce((prev, cur) => {
    if (cur.data.length > prev.data.length) {
      return cur;
    }
    return prev;
  }, data[0]);

  const labels = longestSeries.data.map(({key}) => `${key}`);

  const stackedValues = getStackedValues({
    series: data,
    labels,
    order: stackOrderNone,
    offset: stackOffsetDiverging,
  });

  const formattedStackedValues = labels.map((_, labelIndex) => {
    return stackedValues.map((data) => {
      return data[labelIndex];
    });
  });

  return {stackedValues, formattedStackedValues};
}

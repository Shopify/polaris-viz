import {stack} from 'd3-shape';
import type {DataSeries} from '@shopify/polaris-viz-core';

function getKey(index: number, name?: string) {
  return `${name ?? 'stack'}-${index}`;
}

interface Options {
  series: DataSeries[];
  labels: string[];
  order;
  offset;
}

export function getStackedValues({series, labels, order, offset}: Options) {
  const stackedValues = stack()
    .offset(offset)
    .order(order)
    .keys(series.map(({name}, index) => getKey(index, name)));

  const formattedData = labels.map((_, labelIndex) =>
    series.reduce((acc, {name, data}, index) => {
      const indexData = data[labelIndex];
      const namedData = {
        [getKey(index, name)]: indexData.value == null ? 0 : indexData.value,
      };

      return Object.assign(acc, namedData);
    }, {}),
  );

  return stackedValues(formattedData);
}

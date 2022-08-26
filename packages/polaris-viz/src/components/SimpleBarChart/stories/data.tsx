import React from 'react';
import type {Story} from '@storybook/react';
import type {DataSeries, DataPoint} from '@shopify/polaris-viz-core';

import {SimpleBarChart, SimpleBarChartProps} from '../SimpleBarChart';

export const Template: Story<SimpleBarChartProps> = (
  args: SimpleBarChartProps,
) => {
  return (
    <div style={{height: 500}}>
      <SimpleBarChart {...args} />
    </div>
  );
};

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];
const GROUPS = [
  'Womens Leggings',
  'Mens Bottoms',
  'Mens Shorts',
  'Socks',
  'Hats',
  'Ties',
];

export function buildSeries(
  items: number[] | number[][],
  labels: string[] = LABELS,
): DataSeries[] {
  return labels.map((name, index) => {
    const data = GROUPS.map((name, groupIndex) => {
      const item = items[groupIndex];
      const array = Array.isArray(item) ? item : [item];

      if (array[index] == null) {
        return false;
      }

      return {
        key: name,
        value: array[index],
      };
    });

    return {
      name,
      data: data.filter(Boolean) as DataPoint[],
    };
  });
}

export const SERIES = buildSeries([
  [3, 4, 7],
  [0, 0, 0],
  [4, 5, 6],
  [8, 15, 12],
  [48, 8, 50],
  [1, 5, 5],
]);

export const SINGLE_SERIES = buildSeries(
  [[3], [0], [4], [8], [48], [1]],
  [LABELS[0]],
);

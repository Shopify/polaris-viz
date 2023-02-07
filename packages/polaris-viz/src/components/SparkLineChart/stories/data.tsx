import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {SparkLineChart, SparkLineChartProps} from '../SparkLineChart';

export const DEFAULT_DATA: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 1000},
      {key: 6, value: 200},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
  {
    isComparison: true,
    data: [
      {key: 0, value: 200},
      {key: 1, value: 200},
      {key: 2, value: 200},
      {key: 3, value: 200},
      {key: 4, value: 200},
      {key: 5, value: 200},
      {key: 6, value: 200},
      {key: 7, value: 200},
      {key: 8, value: 200},
      {key: 9, value: 200},
      {key: 10, value: 200},
    ],
  },
];

export const DEFAULT_PROPS: Partial<SparkLineChartProps> = {
  accessibilityLabel: 'Customer growth over time',
};

export const Template: Story<SparkLineChartProps> = (
  args: SparkLineChartProps,
) => {
  return <SparkLineChart {...args} />;
};

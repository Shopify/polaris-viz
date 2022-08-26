import React from 'react';
import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {SparkBarChart, SparkBarChartProps} from '../SparkBarChart';

export const Template: Story<SparkBarChartProps> = (
  args: SparkBarChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          bar: {
            borderRadius: 5,
          },
        },
      }}
    >
      <SparkBarChart {...args} />
    </PolarisVizProvider>
  );
};

export const DEFAULT_COMPARISON_VALUE = 2000;

export const DEFAULT_DATA: DataSeries[] = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 100},
      {key: 6, value: 2000},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
];

export const DEFAULT_PROPS: Partial<SparkBarChartProps> = {
  accessibilityLabel:
    'A bar chart showing orders over time for the past 11 weeks. The minimum is 100 orders and the maximum is 1,000 orders, compared to an average of 500 orders during previous 11-week period.',
};

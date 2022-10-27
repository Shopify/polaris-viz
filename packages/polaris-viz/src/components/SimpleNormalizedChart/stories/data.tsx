import React from 'react';
import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {
  SimpleNormalizedChart,
  SimpleNormalizedChartProps,
} from '../SimpleNormalizedChart';

export const Template: Story<SimpleNormalizedChartProps> = (
  args: SimpleNormalizedChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          bar: {
            borderRadius: 2,
          },
          chartContainer: {
            minHeight: 400,
          },
        },
      }}
    >
      <SimpleNormalizedChart {...args} />;
    </PolarisVizProvider>
  );
};

export const DEFAULT_PROPS: Partial<SimpleNormalizedChartProps> = {
  direction: 'horizontal',
  size: 'small',
  legendPosition: 'top-left',
  labelFormatter: (value) => `$${value}`,
  comparisonMetrics: [
    {
      dataIndex: 2,
      metric: 'Going Up',
      trend: 'positive',
      accessibilityLabel: 'Going Up',
    },
  ],
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'This is an extremely long label that gets truncated at the fith row and shows some dots',
    data: [
      {
        key: 'April 2022',
        value: 200,
      },
    ],
  },
  {
    name: 'Facebook',
    data: [
      {
        key: 'April 2022',
        value: 100,
      },
    ],
  },
  {
    name: 'This is an extremely long label which does not get truncated here',
    data: [
      {
        key: 'April 2022',
        value: 100,
      },
    ],
  },
  {
    name: 'Google',
    data: [
      {
        key: 'April 2022',
        value: 20,
      },
    ],
  },
];

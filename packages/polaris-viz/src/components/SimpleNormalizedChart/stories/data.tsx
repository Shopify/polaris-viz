import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';
import {SimpleNormalizedChart} from '../SimpleNormalizedChart';

export const Template: Story<SimpleNormalizedChartProps> = (
  args: SimpleNormalizedChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        [DEFAULT_THEME_NAME]: {
          bar: {
            borderRadius: 2,
          },
          chartContainer: {
            minHeight: 400,
          },
        },
      }}
    >
      <SimpleNormalizedChart {...args} />
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
      dataIndex: 1,
      metric: '25%',
      trend: 'negative',
      accessibilityLabel: 'Decrease of 25%',
    },
    {
      dataIndex: 2,
      metric: '45%',
      trend: 'positive',
      accessibilityLabel: 'Increase of 45%',
    },
    {
      dataIndex: 3,
      metric: undefined,
      trend: 'neutral',
      accessibilityLabel: 'No change',
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

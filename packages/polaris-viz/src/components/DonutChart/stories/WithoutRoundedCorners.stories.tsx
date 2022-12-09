import React from 'react';
import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';

const WithoutRoundedCornersTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          arc: {
            cornerRadius: 0,
          }
        },
      }}
    >
      <DonutChart {...args} />
    </PolarisVizProvider>
  );
};

export const WithoutRoundedCorners: Story<DonutChartProps> = WithoutRoundedCornersTemplate.bind({});

WithoutRoundedCorners.args = {
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
    },
    {
      name: 'Other',
      data: [{key: 'april - march', value: 10000}],
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 4000}],
    },
  ],
  comparisonMetric: {
    metric: '10%',
    trend: 'negative',
    accessibilityLabel: 'trending down 10%',
  },
};

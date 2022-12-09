import React from 'react';
import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';

const CustomArcWidthTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          arc: {
            thickness: 50,
          }
        },
      }}
    >
      <DonutChart {...args} />
    </PolarisVizProvider>
  );
};

export const CustomArcWidth: Story<DonutChartProps> = CustomArcWidthTemplate.bind({});

CustomArcWidth.args = {
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

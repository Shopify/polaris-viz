import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {Template} from './data';

export const Default: Story<DonutChartProps> = Template.bind({});

Default.args = {
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

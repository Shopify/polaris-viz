import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const WithLegendValues: Story<DonutChartProps> = Template.bind({});

WithLegendValues.args = {
  ...DEFAULT_PROPS,
  showLegend: true,
  showLegendValues: true,
  legendPosition: 'right',
  labelFormatter: (value) => `$${value}`,
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
      metadata: {
        trend: {
          value: '5%',
        },
      },
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
      metadata: {
        trend: {
          value: '50%',
          direction: 'downward',
          trend: 'negative',
        },
      },
    },
    {
      name: 'Other',
      data: [{key: 'april - march', value: 10000}],
      metadata: {
        trend: {
          value: '100%',
          direction: 'upward',
          trend: 'positive',
        },
      },
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 5000}],
      metadata: {
        trend: {
          direction: 'upward',
          trend: 'positive',
        },
      },
    },
  ],
};

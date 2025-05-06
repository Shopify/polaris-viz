import type {Story} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/DonutChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const TinySlices: Story<DonutChartProps> = Template.bind({});

TinySlices.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 5000000}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 250}],
    },
    {
      name: 'Other',
      data: [{key: 'april - march', value: 1000000}],
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 400}],
    },
  ],
};

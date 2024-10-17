import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {Template} from './data';

export const InfinityState: Story<DonutChartProps> = Template.bind({});

InfinityState.args = {
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: Infinity}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
    },
  ],
};

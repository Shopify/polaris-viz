import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const CustomColors: StoryFn<DonutChartProps> = Template.bind({});

CustomColors.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
      color: 'lime',
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 4000}],
    },
  ],
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/CustomColors'} as any;
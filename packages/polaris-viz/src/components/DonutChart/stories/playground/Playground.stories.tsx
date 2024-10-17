import type {Story} from '@storybook/react';

import type {DonutChartProps} from '../../../../components';
import {META} from '../meta';
import {Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

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

export const EmptyDataSeries: Story<DonutChartProps> = Template.bind({});

EmptyDataSeries.args = {
  data: [
    {
      name: 'Shopify Payments',
      data: [],
    },
    {
      name: 'Paypal',
      data: [],
    },
  ],
};

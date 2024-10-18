import type {Story} from '@storybook/react';

import type {ComboChartProps} from '../../../../components';

import {Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const InfinityBar: Story<ComboChartProps> = Template.bind({});

InfinityBar.args = {
  data: [
    {
      shape: 'Bar',
      name: 'Total Sales',
      series: [
        {
          name: 'POS',
          data: [{value: Infinity, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
    {
      shape: 'Line',
      name: 'Total Sessions',
      series: [
        {
          name: 'Sessions from Google ads',
          data: [{value: 333, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
  ],
};

export const InfinityLine: Story<ComboChartProps> = Template.bind({});

InfinityLine.args = {
  data: [
    {
      shape: 'Bar',
      name: 'Total Sales',
      series: [
        {
          name: 'POS',
          data: [{value: 333, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
    {
      shape: 'Line',
      name: 'Total Sessions',
      series: [
        {
          name: 'Sessions from Google ads',
          data: [{value: Infinity, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
  ],
};

export const InfinityBoth: Story<ComboChartProps> = Template.bind({});

InfinityBoth.args = {
  data: [
    {
      shape: 'Bar',
      name: 'Total Sales',
      series: [
        {
          name: 'POS',
          data: [{value: Infinity, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
    {
      shape: 'Line',
      name: 'Total Sessions',
      series: [
        {
          name: 'Sessions from Google ads',
          data: [{value: Infinity, key: '2020-07-07T12:00:00'}],
        },
      ],
    },
  ],
};

import type {DataGroup} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import {ComboChart, ComboChartProps} from '../ComboChart';

export const Template: Story<ComboChartProps> = ({
  ...args
}: ComboChartProps) => {
  return (
    <div style={{height: 500}}>
      <ComboChart {...args} />
    </div>
  );
};

export const DEFAULT_DATA: DataGroup[] = [
  {
    shape: 'Bar',
    name: 'Total Sales',
    series: [
      {
        name: 'POS',
        data: [
          {value: 3, key: '2020-07-07T12:00:00'},
          {value: -7, key: '2020-07-08T12:00:00'},
          {value: -7, key: '2020-07-09T12:00:00'},
          {value: -8, key: '2020-07-10T12:00:00'},
          {value: 50, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Online',
        data: [
          {value: 4, key: '2020-07-07T12:00:00'},
          {value: 0, key: '2020-07-08T12:00:00'},
          {value: -10, key: '2020-07-09T12:00:00'},
          {value: 15, key: '2020-07-10T12:00:00'},
          {value: 8, key: '2020-07-11T12:00:00'},
        ],
        color: 'lime',
      },
      {
        name: 'Mobile',
        data: [
          {value: 7, key: '2020-07-07T12:00:00'},
          {value: 0, key: '2020-07-08T12:00:00'},
          {value: -15, key: '2020-07-09T12:00:00'},
          {value: 8, key: '2020-07-10T12:00:00'},
          {value: 50, key: '2020-07-11T12:00:00'},
        ],
      },
    ],
  },
  {
    shape: 'Line',
    name: 'Total Sessions',
    series: [
      {
        name: 'Sessions from Google ads',
        data: [
          {value: 333, key: '2020-07-07T12:00:00'},
          {value: 797, key: '2020-07-08T12:00:00'},
          {value: 234, key: '2020-07-09T12:00:00'},
          {value: 534, key: '2020-07-10T12:00:00'},
          {value: 132, key: '2020-07-11T12:00:00'},
        ],
      },
      {
        name: 'Sessions from Facebooks ads',
        data: [
          {value: 709, key: '2020-07-07T12:00:00'},
          {value: 238, key: '2020-07-08T12:00:00'},
          {value: 190, key: '2020-07-09T12:00:00'},
          {value: 90, key: '2020-07-10T12:00:00'},
          {value: 399, key: '2020-07-11T12:00:00'},
        ],
        isComparison: true,
      },
    ],
  },
];

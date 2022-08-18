import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import {FunnelChart, FunnelChartProps} from '../FunnelChart';

export const DEFAULT_DATA: DataSeries[] = [
  {
    data: [
      {
        value: 126,
        key: 'Opens',
      },
      {
        value: 48,
        key: 'Visitors',
      },
      {
        value: 12,
        key: 'Added to carts',
      },
      {
        value: 0,
        key: 'Orders',
      },
    ],
    name: 'Conversion',
  },
];

export const Template: Story<FunnelChartProps> = (args: FunnelChartProps) => {
  return (
    <div style={{height: 400}}>
      <FunnelChart {...args} />
    </div>
  );
};

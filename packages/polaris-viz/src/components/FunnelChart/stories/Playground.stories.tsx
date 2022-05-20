import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {FunnelChart, FunnelChartProps} from '../FunnelChart';

export default {
  title: 'polaris-viz/Default Charts/FunnelChart/Playground',
  component: FunnelChart,
  parameters: {
    horizontalMargin: 0,
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
} as Meta;

const data = [
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
        value: 4,
        key: 'Orders',
      },
    ],
    name: 'Conversion',
  },
];

const SingleValuesTemplate: Story<FunnelChartProps> = (
  args: FunnelChartProps,
) => {
  return (
    <div style={{height: 400}}>
      <FunnelChart {...args} />
    </div>
  );
};

export const SingleValues = SingleValuesTemplate.bind({});

SingleValues.args = {
  data,
};

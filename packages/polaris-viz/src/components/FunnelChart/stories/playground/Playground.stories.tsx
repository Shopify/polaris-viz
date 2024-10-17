import type {Story} from '@storybook/react';

import {FunnelChart, FunnelChartProps} from '../../FunnelChart';
import {META} from '../meta';
import {Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

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

export const InfinityState = Template.bind({});

InfinityState.args = {
  data: [
    {
      data: [
        {
          value: 126,
          key: 'Opens',
        },
        {
          value: Infinity,
          key: 'Added to carts',
        },
      ],
      name: 'Conversion',
    },
  ],
};

export const EmptyDataSeries = Template.bind({});

EmptyDataSeries.args = {
  data: [
    {
      data: [],
      name: 'Conversion',
    },
  ],
};

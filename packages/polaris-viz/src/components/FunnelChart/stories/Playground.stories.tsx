import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {FunnelChart, FunnelChartProps} from '../..';

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

const DATA = [
  {
    data: [
      {
        value: 4,
        key: '0',
      },
      {
        value: 3,
        key: '1',
      },
      {
        value: 0,
        key: '2',
      },
      {
        value: 0,
        key: '3',
      },
      {
        value: 0,
        key: '4',
      },
    ],
    name: 'First-time',
  },
];

const SingleValuesTemplate: Story<FunnelChartProps> = (
  args: FunnelChartProps,
) => {
  return (
    <div style={{width: 600, height: 400}}>
      <FunnelChart {...args} />
    </div>
  );
};

export const SingleValues = SingleValuesTemplate.bind({});

SingleValues.args = {
  data: DATA,
};

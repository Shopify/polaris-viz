import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';
import {formatHourlyLabel} from '../../../components/LineChart/stories/utils.stories';
export default {
  title: 'polaris-viz/Charts/StackedAreaChart/Playground',
  component: StackedAreaChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
  },
} as Meta;

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};

export const WebData = Template.bind({});

WebData.args = {
  xAxisOptions: {
    labelFormatter: formatHourlyLabel,
  },
  data: [
    {
      data: [
        {
          value: 0,
          key: '2022-03-23T00:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T01:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T02:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T03:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T04:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T05:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T06:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T07:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T08:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T09:00:00-04:00',
        },
        {
          value: 3,
          key: '2022-03-23T10:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T11:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T12:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T13:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T14:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T15:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T16:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T17:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T18:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T19:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T20:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T21:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T22:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T23:00:00-04:00',
        },
      ],
      name: 'First-time',
    },
    {
      data: [
        {
          value: 0,
          key: '2022-03-23T00:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T01:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T02:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T03:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T04:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T05:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T06:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T07:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T08:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T09:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T10:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T11:00:00-04:00',
        },
        {
          value: 1,
          key: '2022-03-23T12:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T13:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T14:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T15:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T16:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T17:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T18:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T19:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T20:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T21:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T22:00:00-04:00',
        },
        {
          value: 0,
          key: '2022-03-23T23:00:00-04:00',
        },
      ],
      name: 'Returning',
    },
  ],
};

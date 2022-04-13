import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {LineChart, LineChartProps} from '@shopify/polaris-viz';

import {randomNumber} from '../../utilities/generate-data';

import {formatHourlyLabel} from './utilities';

export const HOURLY_DATA = [
  {
    name: 'Hourly Data',
    data: Array(743)
      .fill(null)
      .map((_, index) => {
        return {
          key: new Date(2021, 1, 1, index).toISOString(),
          value: randomNumber(0, 400),
        };
      }),
  },
];

export default {
  title: 'polaris-viz/Default Charts/LineChart/Playground',
  component: LineChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const LargeDataSet: Story<LineChartProps> = Template.bind({});
LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    labelFormatter: formatHourlyLabel,
  },
};

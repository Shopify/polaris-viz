import React from 'react';
import {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';

import {data, labels, formatYAxisLabel} from './utils.stories';

export default {
  title: 'StackedAreaChart',
  component: StackedAreaChart,
} as Meta;

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  series: data,
  skipLinkText: 'Skip chart content',
  xAxisLabels: labels,
  formatYAxisLabel: formatYAxisLabel,
};

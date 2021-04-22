import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';

import {
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
} from './utils.stories';
import {primaryColor, secondaryColor} from '../../../utilities';

export default {
  title: 'BarChart',
  component: BarChart,
  argTypes: {
    barOptions: {
      control: false,
    },
    xAxisOptions: {
      control: false,
    },
    yAxisOptions: {
      control: false,
    },
    renderTooltipContent: {
      control: false,
    },
    gridOptions: {
      control: false,
    },
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    {rawValue: 324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 25.6, label: '2020-01-04T12:00:00Z'},
    {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ],
  barOptions: {color: primaryColor, highlightColor: secondaryColor},
  xAxisOptions: {labelFormatter: formatXAxisLabel},
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

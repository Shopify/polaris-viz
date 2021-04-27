import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';

import {
  formatXAxisLabel,
  formatYAxisLabel,
  formatLabelNoop,
  renderTooltipContent,
  renderTooltipContentWithAnnotation,
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

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

const barGradient = [
  {
    color: negativePurple,
    offset: 0,
  },
  {
    color: purple,
    offset: 50,
  },
  {
    color: green,
    offset: 100,
  },
];

export const Default = Template.bind({});
Default.args = {
  data: [
    {rawValue: 1324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 613.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 422.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 25.6, label: '2020-01-04T12:00:00Z'},
    {rawValue: 277.69, label: '2020-01-05T12:00:00Z'},
    {rawValue: 421.19, label: '2020-01-06T12:00:00Z'},
  ],
  barOptions: {
    color: barGradient,
    hasRoundedCorners: true,
  },
  xAxisOptions: {labelFormatter: formatXAxisLabel},
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const Annotations = Template.bind({});
Annotations.args = {
  data: [
    {rawValue: 10, label: '0'},
    {rawValue: 45, label: '1'},
    {rawValue: 16, label: '2'},
    {rawValue: 9, label: '3'},
    {rawValue: 32, label: '4'},
    {rawValue: 85, label: '5'},
    {rawValue: 74, label: '6'},
    {rawValue: 100, label: '7'},
    {rawValue: 58, label: '8'},
    {rawValue: 40, label: '9'},
    {rawValue: 58, label: '10'},
    {rawValue: 64, label: '11'},
    {rawValue: 9, label: '12'},
    {rawValue: 26, label: '13'},
    {rawValue: 34, label: '14'},
    {rawValue: 50, label: '15'},
    {rawValue: 56, label: '16'},
    {rawValue: 85, label: '17'},
    {rawValue: 2, label: '18'},
    {rawValue: 52, label: '19'},
  ],
  annotations: [
    {
      dataIndex: 1,
      xOffset: 0.5,
      width: 5,
      color: 'green',
      ariaLabel: 'Median: 1.5',
      tooltipData: {
        label: 'Median',
        value: '1.5 hours',
      },
    },
  ],
  barOptions: {color: primaryColor, highlightColor: secondaryColor},
  xAxisOptions: {labelFormatter: formatLabelNoop},
  yAxisOptions: {labelFormatter: formatLabelNoop},
  renderTooltipContent: renderTooltipContentWithAnnotation,
  isAnimated: false,
};

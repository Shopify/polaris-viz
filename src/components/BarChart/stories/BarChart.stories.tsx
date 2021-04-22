import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';

import {
  colorOptions,
  primaryColor,
  secondaryColor,
  formatXAxisLabel,
  formatYAxisLabel,
  formatNoOperation,
  renderTooltipContent,
  renderTooltipContentWithAnnotations,
  chartData,
  histogramChartData,
} from './utils.stories';

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
  data: chartData,
  barOptions: {
    color: primaryColor,
    highlightColor: secondaryColor,
  },
  xAxisOptions: {labelFormatter: formatXAxisLabel},
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const Annotated = Template.bind({});
Annotated.args = {
  data: histogramChartData,
  barOptions: {
    color: primaryColor,
    highlightColor: secondaryColor,
  },
  xAxisOptions: {labelFormatter: formatNoOperation},
  yAxisOptions: {labelFormatter: formatNoOperation},
  renderTooltipContent: renderTooltipContentWithAnnotations,
};

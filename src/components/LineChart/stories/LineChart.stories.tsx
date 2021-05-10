import React from 'react';
import {Story, Meta} from '@storybook/react';

import {LineChart, LineChartProps} from '../LineChart';
import styles from './LineChart.stories.scss';
import {
  series,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
} from './utils.stories';

export default {
  title: 'LineChart',
  component: LineChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  argTypes: {
    // Render the prop documentation but without a control.
    formatXAxisLabel: {
      control: false,
    },
    formatYAxisLabel: {
      control: false,
    },
    renderTooltipContent: {
      control: false,
    },
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  series: [{...series[0], color: 'primary', areaColor: null}, series[1]],
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const Gradient = Template.bind({});
Gradient.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const HideXAxisLabels = Template.bind({});
HideXAxisLabels.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    hideXAxisLabels: true,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const OverflowStyle = Template.bind({});
OverflowStyle.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    showTicks: false,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel, backgroundColor: 'white'},
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 20,
    showVerticalLines: false,
  },
  lineOptions: {hasSpline: true},
  renderTooltipContent,
};

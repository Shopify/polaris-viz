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

export const OverflowStyle = Template.bind({});
OverflowStyle.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    useMinimalLabels: true,
    marginTop: 10,
    showAxisLine: false,
    showTicks: false,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
    labelBackgroundColor: '#e4e4e4',
  },
  gridOptions: {showVerticalLines: false},
  lineOptions: {overflow: true, hasSpline: true},
};

export const Default = Template.bind({});
Default.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

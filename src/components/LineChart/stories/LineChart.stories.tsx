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

export const curvedLines = Template.bind({});
curvedLines.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    showTicks: false,
    hideXAxisLabels: true,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
    backgroundColor: 'white',
  },
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 20,
    showVerticalLines: false,
  },
  isAnimated: true,
  lineOptions: {hasSpline: true},
  renderTooltipContent,
};

export const DarkMode = Template.bind({});
DarkMode.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
DarkMode.args = {
  series,
  isAnimated: true,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    useMinimalLabels: true,
    showTicks: false,
  },
  lineOptions: {
    hasSpline: true,
    pointStroke: '#333333',
  },
  gridOptions: {
    showVerticalLines: false,
    color: 'rgb(99, 115, 129)',
    horizontalOverflow: true,
    horizontalMargin: 20,
  },
  crossHairOptions: {
    width: 1,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel, backgroundColor: '#333333'},
  renderTooltipContent,
};

export const IntegersOnly = Template.bind({});
IntegersOnly.args = {
  series: [
    {
      name: 'Integers Only',
      data: [
        {rawValue: 0.1, label: '2020-04-01T12:00:00'},
        {rawValue: 0.4, label: '2020-04-02T12:00:00'},
        {rawValue: 0.6, label: '2020-04-03T12:00:00'},
        {rawValue: 0.2, label: '2020-04-04T12:00:00'},
        {rawValue: 0.5, label: '2020-04-05T12:00:00'},
        {rawValue: 0.9, label: '2020-04-06T12:00:00'},
        {rawValue: 0.5, label: '2020-04-07T12:00:00'},
      ],
    },
  ],
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {integersOnly: true},
  renderTooltipContent,
};

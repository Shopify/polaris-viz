import React from 'react';
import {Story, Meta} from '@storybook/react';

import {LineChart, LineChartProps} from '../../../components';
import {Color} from '../../../types';

import {
  colorOptions,
  getDataPoint,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
} from './utils.stories';
import styles from './LineChart.stories.scss';

const primaryColor = colorOptions[0] as Color;
const secondaryColor = colorOptions[1] as Color;

const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 2251, label: '2020-04-01T12:00:00'},
      {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
      {rawValue: 5000, label: '2020-04-03T12:00:00'},
      {rawValue: 7200, label: '2020-04-04T12:00:00'},
      {rawValue: 1500, label: '2020-04-05T12:00:00'},
      {rawValue: 6132, label: '2020-04-06T12:00:00'},
      {rawValue: 3100, label: '2020-04-07T12:00:00'},
      {rawValue: 2200, label: '2020-04-08T12:00:00'},
      {rawValue: 5103, label: '2020-04-09T12:00:00'},
      {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
      {rawValue: 4004, label: '2020-04-11T12:00:00'},
      {rawValue: 6000, label: '2020-04-12T12:00:00'},
      {rawValue: 5500, label: '2020-04-13T12:00:00'},
      {rawValue: 7000, label: '2020-04-14T12:00:00'},
    ],
    color: primaryColor,
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 5200, label: '2020-03-01T12:00:00'},
      {rawValue: 7000, label: '2020-03-02T12:00:00'},
      {rawValue: 1000, label: '2020-03-03T12:00:00'},
      {rawValue: 2000, label: '2020-03-04T12:00:00'},
      {rawValue: 5000, label: '2020-03-05T12:00:00'},
      {rawValue: 1000, label: '2020-03-06T12:00:00'},
      {rawValue: 2000, label: '2020-03-07T12:00:00'},
      {rawValue: 5000, label: '2020-03-08T12:00:00'},
      {rawValue: 4000, label: '2020-03-09T12:00:00'},
      {rawValue: 11200, label: '2020-03-10T12:00:00'},
      {rawValue: 2000, label: '2020-03-11T12:00:00'},
      {rawValue: 3000, label: '2020-03-12T12:00:00'},
      {rawValue: 2000, label: '2020-03-13T12:00:00'},
      {rawValue: 3000, label: '2020-03-14T12:00:00'},
    ],
    color: secondaryColor,
    lineStyle: 'dashed' as 'dashed',
  },
];

console.log(secondaryColor);

const xAxisLabels = series[0].data.map(({label}) => label);

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
  series,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  skipLinkText: 'Skip chart content',
};

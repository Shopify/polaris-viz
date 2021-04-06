import React from 'react';
import {Story, Meta} from '@storybook/react';

import {MultiSeriesBarChart, MultiSeriesBarChartProps} from '../..';

import {
  labels,
  formatYAxisLabel,
  renderTooltipContent,
  getDataPoint,
} from './utils.stories';
import styles from './MultiSeriesBarChart.stories.scss';

export default {
  title: 'MultiSeriesBarChart',
  component: MultiSeriesBarChart,
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

const Template: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
  return <MultiSeriesBarChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  series: [
    {
      color: 'primary' as 'primary',
      highlightColor: 'primaryProminent' as 'primaryProminent',
      name: 'Breakfast',
      data: [
        {label: 'Monday', rawValue: getDataPoint()},
        {label: 'Tuesday', rawValue: getDataPoint()},
        {label: 'Wednesday', rawValue: getDataPoint()},
        {label: 'Thursday', rawValue: getDataPoint()},
        {label: 'Friday', rawValue: getDataPoint()},
        {label: 'Saturday', rawValue: getDataPoint()},
        {label: 'Sunday', rawValue: getDataPoint()},
      ],
    },
    {
      color: 'secondary' as 'secondary',
      highlightColor: 'secondaryProminent' as 'secondaryProminent',
      name: 'Lunch',
      data: [
        {label: 'Monday', rawValue: getDataPoint()},
        {label: 'Tuesday', rawValue: getDataPoint()},
        {label: 'Wednesday', rawValue: getDataPoint()},
        {label: 'Thursday', rawValue: getDataPoint()},
        {label: 'Friday', rawValue: getDataPoint()},
        {label: 'Saturday', rawValue: getDataPoint()},
        {label: 'Sunday', rawValue: getDataPoint()},
      ],
    },
    {
      color: 'tertiary' as 'tertiary',
      highlightColor: 'tertiaryProminent' as 'tertiaryProminent',
      name: 'Dinner',
      data: [
        {label: 'Monday', rawValue: getDataPoint()},
        {label: 'Tuesday', rawValue: getDataPoint()},
        {label: 'Wednesday', rawValue: getDataPoint()},
        {label: 'Thursday', rawValue: getDataPoint()},
        {label: 'Friday', rawValue: getDataPoint()},
        {label: 'Saturday', rawValue: getDataPoint()},
        {label: 'Sunday', rawValue: getDataPoint()},
      ],
    },
  ],
  formatYAxisLabel,
  renderTooltipContent,
  labels,
};

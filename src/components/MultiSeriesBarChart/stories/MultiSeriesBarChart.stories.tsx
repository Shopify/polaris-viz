import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  MultiSeriesBarChart,
  MultiSeriesBarChartProps,
} from '../../../components';

import styles from './MultiSeriesBarChart.stories.scss';

const series = [
  {
    name: 'Breakfast',
    color: 'primary',
    highlightColor: 'primaryProminent',
    data: [
      {label: 'Monday', rawValue: 3},
      {label: 'Tuesday', rawValue: 7},
      {label: 'Wednesday', rawValue: 4},
      {label: 'Thursday', rawValue: 8},
      {label: 'Friday', rawValue: 10},
      {label: 'Saturday', rawValue: 0},
      {label: 'Sunday', rawValue: 1},
    ],
  },
  {
    name: 'Lunch',
    color: 'secondary',
    highlightColor: 'secondaryProminent',
    data: [
      {label: 'Monday', rawValue: 4},
      {label: 'Tuesday', rawValue: 3},
      {label: 'Wednesday', rawValue: 5},
      {label: 'Thursday', rawValue: 15},
      {label: 'Friday', rawValue: 8},
      {label: 'Saturday', rawValue: 10},
      {label: 'Sunday', rawValue: 2},
    ],
  },
  {
    name: 'Dinner',
    color: 'tertiary',
    highlightColor: 'tertiaryProminent',
    data: [
      {label: 'Monday', rawValue: 7},
      {label: 'Tuesday', rawValue: 2},
      {label: 'Wednesday', rawValue: 6},
      {label: 'Thursday', rawValue: 12},
      {label: 'Friday', rawValue: 10},
      {label: 'Saturday', rawValue: 5},
      {label: 'Sunday', rawValue: 3},
    ],
  },
];

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default {
  title: 'MultiSeriesBarChart',
  component: MultiSeriesBarChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
} as Meta;

const Template: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
  return <MultiSeriesBarChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  series,
  labels,
};

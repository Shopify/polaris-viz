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
    data: [
      {label: 'Monday', rawValue: 4},
      {label: 'Tuesday', rawValue: 0},
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
    data: [
      {label: 'Monday', rawValue: 7},
      {label: 'Tuesday', rawValue: 0},
      {label: 'Wednesday', rawValue: 6},
      {label: 'Thursday', rawValue: 12},
      {label: 'Friday', rawValue: 10},
      {label: 'Saturday', rawValue: 5},
      {label: 'Sunday', rawValue: 3},
    ],
  },
];

const labels = [
  'Mon. Mon. Mon. Mon. Mon. Mon.',
  'Tues. Tues. Tues. Tues. Tues. Tues. Tues.',
  'Weds. Weds. Weds. Weds. Weds. Weds.',
  'Thurs. Thurs. Thurs. Thurs. Thurs. Thurs. Thurs.',
  'Fri. Fri. Fri. Fri. Fri. Fri. Fri. Fri.',
  'Sat. Sat. Sat. Sat. Sat. Sat.',
  'Sun. Sun. Sun. Sun. Sun. Sun. Sun. Sun.',
];
export default {
  title: 'MultiSeriesBarChart',
  component: MultiSeriesBarChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
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

const Template: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
  return <MultiSeriesBarChart {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  series,
  xAxisOptions: {labels},
};

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

const barGradient1 = [
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
const barGradient2 = [
  {
    color: '#374352',
    offset: 0,
  },
  {
    color: '#4d5e73',
    offset: 50,
  },
];

const gradientSeries = series
  .map((serie, index) => ({
    ...serie,
    color: index % 2 === 0 ? barGradient1 : barGradient2,
  }))
  .filter((_, index) => index < 2);

export const Gradient = Template.bind({});
Gradient.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    hasRoundedCorners: true,
  },
};

export const OverflowStyles = Template.bind({});
OverflowStyles.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    hasRoundedCorners: true,
  },
  yAxisOptions: {backgroundColor: 'white'},
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 30,
    showVerticalLines: false,
  },
};

export const Stacked = Template.bind({});
Stacked.args = {
  series: series,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const StackedGradient = Template.bind({});
StackedGradient.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const IntegersOnly = Template.bind({});
IntegersOnly.args = {
  series: [
    {
      name: 'Breakfast',
      color: 'primary',
      data: [
        {label: 'Monday', rawValue: 0.3},
        {label: 'Tuesday', rawValue: 0.1},
        {label: 'Wednesday', rawValue: 0.78},
        {label: 'Thursday', rawValue: 0.12},
        {label: 'Friday', rawValue: 0.7},
        {label: 'Saturday', rawValue: 0.3},
        {label: 'Sunday', rawValue: 0.6},
      ],
    },
    {
      name: 'Lunch',
      color: 'secondary',
      data: [
        {label: 'Monday', rawValue: 0},
        {label: 'Tuesday', rawValue: 0.1},
        {label: 'Wednesday', rawValue: 0.12},
        {label: 'Thursday', rawValue: 0.34},
        {label: 'Friday', rawValue: 0.54},
        {label: 'Saturday', rawValue: 0.21},
        {label: 'Sunday', rawValue: 0.1},
      ],
    },
    {
      name: 'Dinner',
      color: 'tertiary',
      data: [
        {label: 'Monday', rawValue: 1.23},
        {label: 'Tuesday', rawValue: 1.42},
        {label: 'Wednesday', rawValue: 2},
        {label: 'Thursday', rawValue: 1.2},
        {label: 'Friday', rawValue: 0.5},
        {label: 'Saturday', rawValue: 0.12},
        {label: 'Sunday', rawValue: 0.6},
      ],
    },
  ],
  xAxisOptions: {labels},
  yAxisOptions: {integersOnly: true},
};

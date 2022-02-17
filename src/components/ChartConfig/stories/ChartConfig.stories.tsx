import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {ChartConfig} from '../..';

import type {DataSeries} from '../../../types';

const DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

export default {
  title: 'ChartConfig',
  component: ChartConfig,
  parameters: {
    docs: {
      description: {
        component:
          'Used when you need a single set of props to determine which chart to use',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    type: {
      control: {
        type: 'select',
      },
      description: 'Which type of chart to render',
      options: ['bar', 'line'],
    },
    direction: {
      control: {
        type: 'select',
      },
      description: 'Which direction to render a chart',
      options: ['horizontal', 'vertical'],
    },
  },
} as Meta;

const Template: Story<any> = (args: any) => {
  return <ChartConfig {...args} />;
};

export const BarChart: Story<any> = Template.bind({});
BarChart.parameters = {controls: {include: ['data', 'type', 'direction']}};
BarChart.args = {
  data: DATA,
  type: 'bar',
};

export const LineChart: Story<any> = Template.bind({});
LineChart.parameters = {
  controls: {include: ['data', 'type']},
};
LineChart.args = {
  data: DATA,
  type: 'line',
};

export const ErrorChart: Story<any> = Template.bind({});
ErrorChart.parameters = {controls: {include: ['data', 'type']}};

ErrorChart.args = {
  data: DATA,
  test: 1,
  type: 'line',
};

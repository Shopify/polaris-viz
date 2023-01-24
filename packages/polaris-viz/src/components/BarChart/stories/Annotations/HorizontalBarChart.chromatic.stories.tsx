import type {Story} from '@storybook/react';

import type {BarChartProps} from '../../../../components';

import {Template} from '../data';
import {META} from '../meta';
import type {DataSeries} from '@shopify/polaris-viz-core';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/BarChart/Annotations',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const HorizontalBarChart: Story<BarChartProps> = Template.bind({});

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

HorizontalBarChart.args = {
  data: DATA,
  annotations: [
    {
      startKey: 'Friday',
      label: 'Big Sale',
      axis: 'y',
    },
    {
      startKey: 'Wednesday',
      label: 'GDPR rule change',
      content: {
        title: 'GDPR rule change',
        content:
          'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
        linkUrl: 'https://shopify.com',
      },
      axis: 'y',
    },
    {
      startKey: '33',
      label: 'Sales target',
      axis: 'x',
    },
    {
      startKey: '10',
      label: 'Break-even',
      axis: 'x',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
  direction: 'horizontal',
  yAxisOptions: {
    labelFormatter: (value) => `${value} with format`,
  },
  xAxisOptions: {
    labelFormatter: (value) => `${value} with format`,
  },
};

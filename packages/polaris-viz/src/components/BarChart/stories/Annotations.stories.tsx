import React from 'react';
import type {Story, Meta} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {BarChart, BarChartProps} from '../../../components';
import type {Annotation} from '../../../types';

import {default as BarChartStory} from './BarChart.stories';

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

const DATA_WITH_COLOR: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: 8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    color: 'lime',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 5},
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
      {key: 'Wednesday', value: 6},
      {key: 'Thursday', value: 12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

export default {
  title: 'polaris-viz/Default Charts/BarChart/Annotations',
  component: BarChart,
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  parameters: BarChartStory.parameters,
  argTypes: BarChartStory.argTypes,
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

const ANNOTATIONS: Annotation[] = [
  {
    startIndex: 0,
    label: 'BOGO Sale',
  },
  {
    startIndex: 2,
    label: 'GDPR rule change',
    content: {
      title: 'GDPR rule change',
      content:
        'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
      linkUrl: 'https://shopify.com',
    },
  },
  {
    startIndex: 5,
    label: 'Viral Tweet',
  },
];

export const Default: Story<BarChartProps> = Template.bind({});

Default.args = {
  data: DATA,
  xAxisOptions: {},
  isAnimated: false,
  showLegend: true,
  annotations: ANNOTATIONS,
};

export const EvenSeriesCount: Story<BarChartProps> = Template.bind({});

EvenSeriesCount.args = {
  data: DATA.slice(0, 2),
  xAxisOptions: {},
  isAnimated: false,
  showLegend: true,
  annotations: ANNOTATIONS,
};

export const OverwittenSeriesColors: Story<BarChartProps> = Template.bind({});

OverwittenSeriesColors.args = {
  data: DATA_WITH_COLOR,
  xAxisOptions: {},
  isAnimated: false,
  showLegend: true,
  annotations: ANNOTATIONS,
};

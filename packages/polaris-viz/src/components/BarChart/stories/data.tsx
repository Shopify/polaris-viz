import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import type {BarChartProps} from '../BarChart';
import {BarChart} from '../BarChart';

export const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 45},
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
      {key: 'Saturday', value: 45},
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
      {key: 'Friday', value: 45},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

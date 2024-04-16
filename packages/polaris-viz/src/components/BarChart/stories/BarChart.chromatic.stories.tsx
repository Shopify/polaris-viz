import type {Story} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {Template} from './data';

export default {
  ...META,
  title: `${META.title}/Chromatic`,
};

export const UniqueStackedValues: Story<BarChartProps> = Template.bind({});

UniqueStackedValues.args = {
  isAnimated: false,
  type: 'stacked',
  data: [
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
      name: 'Breakfast',
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
      name: 'Breakfast',
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
  ],
};

export const BadTheme: Story<BarChartProps> = Template.bind({});

BadTheme.args = {
  data: [
    {
      name: 'Breakfast',
      data: [{key: 'Monday', value: 3}],
    },
    {
      name: 'Breakfast',
      data: [{key: 'Monday', value: 4}],
    },
    {
      name: 'Breakfast',
      data: [{key: 'Monday', value: 7}],
    },
  ],
  theme: 'BadThemeName',
};

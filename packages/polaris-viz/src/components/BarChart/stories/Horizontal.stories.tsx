import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {Template} from './data';

export const Horizontal: StoryFn<BarChartProps> = Template.bind({});

Horizontal.args = {
  data: [
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
  ],
  direction: 'horizontal',
};

export default {META, title: 'polaris-viz/Charts/BarChart/Horizontal'} as any;  
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../BarChart';

import {Template} from './data';

export const IntegersOnly: Story<BarChartProps> = Template.bind({});

IntegersOnly.args = {
  data: [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: 2},
        {key: 'Tuesday', value: 0.1},
        {key: 'Wednesday', value: 0.78},
        {key: 'Thursday', value: 0.12},
        {key: 'Friday', value: 0.7},
        {key: 'Saturday', value: 0.3},
        {key: 'Sunday', value: 0.6},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {key: 'Monday', value: 0},
        {key: 'Tuesday', value: 0.1},
        {key: 'Wednesday', value: 0.12},
        {key: 'Thursday', value: 0.34},
        {key: 'Friday', value: 1.6},
        {key: 'Saturday', value: 0.21},
        {key: 'Sunday', value: 0.1},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {key: 'Monday', value: 1.23},
        {key: 'Tuesday', value: 1.42},
        {key: 'Wednesday', value: 2},
        {key: 'Thursday', value: 1.2},
        {key: 'Friday', value: 0.5},
        {key: 'Saturday', value: 0.12},
        {key: 'Sunday', value: 2},
      ],
    },
  ],
  yAxisOptions: {integersOnly: true},
};

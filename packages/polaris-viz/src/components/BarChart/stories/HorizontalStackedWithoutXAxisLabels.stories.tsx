import type {Story} from '@storybook/react';

import type {BarChartProps} from '../../../components';

import {Template} from './data';

export {META as default} from './meta';

export const HorizontalStackedWithoutXAxisLabels: Story<BarChartProps> =
  Template.bind({});

HorizontalStackedWithoutXAxisLabels.args = {
  data: [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: 1},
        {key: 'Tuesday', value: -10},
        {key: 'Wednesday', value: -7},
        {key: 'Thursday', value: -0.12},
        {key: 'Friday', value: 10},
        {key: 'Saturday', value: 5},
        {key: 'Sunday', value: 6},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {key: 'Monday', value: -10},
        {key: 'Tuesday', value: 7},
        {key: 'Wednesday', value: 12},
        {key: 'Thursday', value: 4},
        {key: 'Friday', value: -0.2},
        {key: 'Saturday', value: -4},
        {key: 'Sunday', value: -9},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {key: 'Monday', value: -1},
        {key: 'Tuesday', value: 4},
        {key: 'Wednesday', value: 2},
        {key: 'Thursday', value: -2},
        {key: 'Friday', value: 10},
        {key: 'Saturday', value: 10},
        {key: 'Sunday', value: 3},
      ],
    },
  ],
  type: 'stacked',
  direction: 'horizontal',
  xAxisOptions: {hide: true}
};

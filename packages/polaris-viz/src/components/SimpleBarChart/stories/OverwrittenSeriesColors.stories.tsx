import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../SimpleBarChart';

import {Template} from './data';

export const OverwrittenSeriesColors: Story<SimpleBarChartProps> =
  Template.bind({});

OverwrittenSeriesColors.args = {
  data: [
    {
      name: 'Shirt',
      data: [
        {value: 4, key: 'Yesterday'},
        {value: 7, key: 'Today'},
      ],
      color: 'lime',
    },
    {
      name: 'Pants',
      data: [
        {value: 5, key: 'Yesterday'},
        {value: 6, key: 'Today'},
      ],
    },
    {
      name: 'Shoes',
      data: [
        {value: 15, key: 'Yesterday'},
        {value: 12, key: 'Today'},
      ],
    },
  ],
};

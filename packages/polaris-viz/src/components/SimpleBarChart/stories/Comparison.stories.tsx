import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {Template} from './data';

export const Comparison: Story<SimpleBarChartProps> = Template.bind({});

Comparison.args = {
  data: [
    {
      name: 'BCFM 2019',
      data: [
        {
          key: 'Womens Leggings',
          value: 3,
        },
        {
          key: 'Mens Bottoms',
          value: 7,
        },
        {
          key: 'Mens Shorts',
          value: 4,
        },
      ],
    },
    {
      name: 'BCFM 2020',
      data: [
        {
          key: 'Womens Leggings',
          value: 4,
        },
        {
          key: 'Mens Bottoms',
          value: 2,
        },
        {
          key: 'Mens Shorts',
          value: 5,
        },
      ],
      isComparison: true,
    },
  ],
};

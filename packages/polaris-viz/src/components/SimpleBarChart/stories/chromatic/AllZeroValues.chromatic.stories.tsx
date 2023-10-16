import type {Story} from '@storybook/react';

import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/SimpleBarChart/AllZeroValues',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import type {SimpleBarChartProps} from '../../../../components';

import {Template} from '../data';

export const AllZeroValues: Story<SimpleBarChartProps> = Template.bind({});

AllZeroValues.args = {
  data: [
    {
      name: 'BCFM 2019',
      data: [
        {
          key: 'Womens Leggings',
          value: 0,
        },
        {
          key: 'Mens Bottoms',
          value: 0,
        },
        {
          key: 'Mens Shorts',
          value: 0,
        },
        {
          key: 'Socks',
          value: 0,
        },
        {
          key: 'Hats',
          value: 0,
        },
        {
          key: 'Ties',
          value: 0,
        },
      ],
      metadata: {
        trends: {
          '0': {
            value: '10%',
          },
        },
      },
    },
  ],
};

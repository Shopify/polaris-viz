import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {Template} from './data';

export const MultipleTrendIndicators: Story<SimpleBarChartProps> =
  Template.bind({});

MultipleTrendIndicators.args = {
  data: [
    {
      name: 'BCFM 2019',
      data: [
        {
          key: 'Womens Leggings',
          value: -3,
        },
        {
          key: 'Mens Bottoms',
          value: 0,
        },
        {
          key: 'Mens Shorts',
          value: 4,
        },
        {
          key: 'Socks',
          value: -8,
        },
        {
          key: 'Hats',
          value: 48,
        },
        {
          key: 'Ties',
          value: 1,
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
    {
      name: 'BCFM 2020',
      data: [
        {
          key: 'Womens Leggings',
          value: 4,
        },
        {
          key: 'Mens Bottoms',
          value: 0,
        },
        {
          key: 'Mens Shorts',
          value: 5,
        },
        {
          key: 'Socks',
          value: 15,
        },
        {
          key: 'Hats',
          value: 8,
        },
        {
          key: 'Ties',
          value: 5,
        },
      ],
      metadata: {
        trends: {
          '0': {
            value: '20%',
          },
        },
      },
    },
    {
      name: 'BCFM 2021',
      data: [
        {
          key: 'Womens Leggings',
          value: 7,
        },
        {
          key: 'Mens Bottoms',
          value: 0,
        },
        {
          key: 'Mens Shorts',
          value: 6,
        },
        {
          key: 'Socks',
          value: 12,
        },
        {
          key: 'Hats',
          value: 50,
        },
        {
          key: 'Ties',
          value: 5,
        },
      ],
    },
  ],
};

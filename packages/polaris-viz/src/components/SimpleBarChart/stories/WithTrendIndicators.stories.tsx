import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {Template} from './data';

export const WithTrendIndicators: Story<SimpleBarChartProps> = Template.bind(
  {},
);

WithTrendIndicators.args = {
  data: [
    {
      data: [
        {
          key: 'Womens Leggings',
          value: 3000,
        },
        {
          key: 'Mens Bottoms',
          value: 0,
        },
        {
          key: 'Mens Shorts',
          value: -4000,
        },
        {
          key: 'Socks',
          value: 800,
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
          0: {},
          2: {
            value: '10%',
          },
          4: {
            value: '10%',
            direction: 'downward',
            trend: 'negative',
          },
          5: {
            value: '10%',
            direction: 'upward',
            trend: 'positive',
          },
          3: {
            direction: 'upward',
            trend: 'positive',
          },
        },
      },
    },
  ],
};

import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {FunnelChartNextProps} from '../FunnelChartNext';
import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';
import {META} from './meta';

export default META;

const DATA_WITH_TRENDS: DataSeries[] = [
  {
    ...DEFAULT_DATA[0],
    metadata: {
      trends: {
        0: {
          value: '8%',
          trend: 'positive',
          direction: 'upward',
        },
        1: {
          value: '15%',
          trend: 'positive',
          direction: 'upward',
        },
        2: {
          value: '12%',
          trend: 'positive',
          direction: 'upward',
        },
        3: {
          value: '10%',
          trend: 'positive',
          direction: 'upward',
        },
      },
    },
  },

  {
    name: 'Conversion rates',
    data: [
      {
        value: 420000,
        key: 'Sessions',
      },
      {
        value: 210000,
        key: 'Sessions with cart addition',
      },
      {
        value: 150000,
        key: 'Sessions that reached checkout',
      },
      {
        value: 100000,
        key: 'Sessions that completed checkout',
      },
    ],
    isComparison: true,
  },
];

export const WithTrendIndicators: Story<FunnelChartNextProps> = Template.bind(
  {},
);

WithTrendIndicators.args = {
  data: DATA_WITH_TRENDS,
  ...DEFAULT_PROPS,
};

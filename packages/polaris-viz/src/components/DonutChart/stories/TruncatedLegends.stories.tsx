import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const TruncatedLegends: Story<DonutChartProps> = Template.bind({});

TruncatedLegends.args = {
  ...DEFAULT_PROPS,
  showLegendValues: true,
  legendPosition: 'right',
  legendFullWidth: false,
  labelFormatter: (value) => `$${value}`,
  isAnimated: false,
  data: [
    {
      name: 'This is a long name that will get truncated',
      data: [{key: 'april - march', value: 50000}],
      metadata: {
        trend: {
          value: '5%',
        },
      },
    },
    {
      name: 'This is another long name that will get truncated',
      data: [{key: 'april - march', value: 250000}],
      metadata: {
        trend: {
          value: '50%',
          direction: 'downward',
          trend: 'negative',
        },
      },
    },
    {
      name: 'This is the last long name that will get truncated',
      data: [{key: 'april - march', value: 10000}],
      metadata: {
        trend: {
          value: '100%',
          direction: 'upward',
          trend: 'positive',
        },
      },
    },
  ],
};

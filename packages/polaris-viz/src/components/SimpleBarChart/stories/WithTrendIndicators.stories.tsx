import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {SINGLE_SERIES, Template} from './data';

export const WithTrendIndicators: Story<SimpleBarChartProps> = Template.bind(
  {},
);

WithTrendIndicators.args = {
  data: [
    {
      ...SINGLE_SERIES[0],
      metadata: {
        trends: {
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
        },
      },
    },
  ],
};

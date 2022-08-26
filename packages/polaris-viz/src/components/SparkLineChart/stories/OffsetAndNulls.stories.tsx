import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../../../components';

import {DEFAULT_PROPS, Template} from './data';

export const OffsetAndNulls: Story<SparkLineChartProps> = Template.bind({});

OffsetAndNulls.args = {
  ...DEFAULT_PROPS,
  offsetRight: 12,
  offsetLeft: 50,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 50},
        {key: 2, value: null},
        {key: 3, value: 200},
        {key: 4, value: 400},
        {key: 5, value: 1000},
        {key: 6, value: 200},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 100},
      ],
    },
    {
      isComparison: true,
      data: [
        {key: 0, value: 20},
        {key: 1, value: 20},
        {key: 2, value: 20},
        {key: 3, value: 20},
        {key: 4, value: 20},
        {key: 5, value: 20},
        {key: 6, value: 20},
        {key: 7, value: 20},
        {key: 8, value: 20},
        {key: 9, value: 20},
        {key: 10, value: 20},
      ],
    },
  ],
};

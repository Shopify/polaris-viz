import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkBarChartProps} from '../SparkBarChart';

import {DEFAULT_PROPS, DEFAULT_COMPARISON_VALUE, Template} from './data';

export const OffsetAndNulls: Story<SparkBarChartProps> = Template.bind({});
OffsetAndNulls.args = {
  ...DEFAULT_PROPS,
  targetLine: {
    offsetLeft: 10,
    offsetRight: 20,
    value: DEFAULT_COMPARISON_VALUE,
  },
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: -300},
        {key: 3, value: null},
        {key: 4, value: 400},
        {key: 5, value: 0},
        {key: 6, value: 0},
        {key: 7, value: 400},
        {key: 8, value: 700},
        {key: 9, value: 900},
        {key: 10, value: 500},
      ],
    },
  ],
};

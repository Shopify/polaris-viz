import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../SparkLineChart';

import {DEFAULT_PROPS, Template} from './data';

export const ZeroSeries: Story<SparkLineChartProps> = Template.bind({});

ZeroSeries.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      isComparison: true,
      data: [
        {key: 0, value: 0},
        {key: 1, value: 0},
        {key: 2, value: 0},
        {key: 3, value: 0},
        {key: 4, value: 0},
        {key: 5, value: 0},
        {key: 6, value: 0},
        {key: 7, value: 0},
        {key: 8, value: 0},
        {key: 9, value: 0},
        {key: 10, value: 0},
      ],
    },
    {
      data: [
        {key: 0, value: 0},
        {key: 1, value: 0},
        {key: 2, value: 0},
        {key: 3, value: 0},
        {key: 4, value: 0},
        {key: 5, value: 0},
        {key: 6, value: 0},
        {key: 7, value: 0},
        {key: 8, value: 0},
        {key: 9, value: 0},
        {key: 10, value: 0},
      ],
    },
  ],
};

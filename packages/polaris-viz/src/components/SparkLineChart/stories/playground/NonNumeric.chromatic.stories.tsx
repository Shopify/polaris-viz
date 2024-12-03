import type {Story} from '@storybook/react';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

import type {SparkLineChartProps} from '../../SparkLineChart';

import {DEFAULT_PROPS, Template} from '../data';

export const NonNumericKeys: Story<SparkLineChartProps> = Template.bind({});

NonNumericKeys.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Sales',
      data: [
        {value: 100, key: '2020-04-01T12:00:00'},
        {value: 99, key: '2020-04-02T12:00:00'},
        {value: 1000, key: '2020-04-03T12:00:00'},
        {value: 2, key: '2020-04-04T12:00:00'},
        {value: 22, key: '2020-04-05T12:00:00'},
        {value: 6, key: '2020-04-06T12:00:00'},
        {value: 5, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
};

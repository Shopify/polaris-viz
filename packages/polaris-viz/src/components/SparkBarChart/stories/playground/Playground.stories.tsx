import type {Story} from '@storybook/react';

import type {SparkBarChartProps} from '../../../../components';
import {META} from '../meta';
import {DEFAULT_PROPS, Template} from '../data';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const InfinityState: Story<SparkBarChartProps> = Template.bind({});

InfinityState.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: Infinity},
        {key: 3, value: 400},
      ],
    },
  ],
  targetLine: {
    value: 100,
  },
};

export const InfinityTargetState: Story<SparkBarChartProps> = Template.bind({});

InfinityTargetState.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: 300},
        {key: 3, value: 400},
      ],
    },
  ],
  targetLine: {
    value: Infinity,
  },
};

export const EmptyDataSeries: Story<SparkBarChartProps> = Template.bind({});

EmptyDataSeries.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      data: [],
    },
  ],
};

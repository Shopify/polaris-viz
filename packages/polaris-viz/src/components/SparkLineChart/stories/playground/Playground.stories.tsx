import type {Story} from '@storybook/react';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

import type {SparkLineChartProps} from '../../SparkLineChart';

import {DEFAULT_PROPS, Template} from '../data';

const DATA = [
  {
    data: [
      {
        key: '2023-03-14T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-15T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-16T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-17T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-18T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-19T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-20T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-21T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-22T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-23T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-24T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-25T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-26T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-27T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-28T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-29T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-30T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-03-31T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-01T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-02T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-03T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-04T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-05T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-06T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-07T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-08T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-09T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-10T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-11T00:00:00-04:00',
        value: 0,
      },
      {
        key: '2023-04-12T00:00:00-04:00',
        value: 0,
      },
    ],
  },
  {
    data: [
      {
        key: '2023-02-12T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-13T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-14T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-15T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-16T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-17T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-18T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-19T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-20T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-21T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-22T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-23T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-24T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-25T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-26T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-27T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-02-28T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-01T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-02T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-03T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-04T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-05T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-06T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-07T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-08T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-09T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-10T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-11T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-12T00:00:00-05:00',
        value: 0,
      },
      {
        key: '2023-03-13T00:00:00-04:00',
        value: 0,
      },
    ],
    isComparison: true,
  },
];

export const AllZeros2Series: Story<SparkLineChartProps> = Template.bind({});

AllZeros2Series.args = {
  ...DEFAULT_PROPS,
  data: DATA,
};

export const AllZerosNoComparison: Story<SparkLineChartProps> = Template.bind(
  {},
);

AllZerosNoComparison.args = {
  ...DEFAULT_PROPS,
  data: [DATA[0]],
};

export const AllZerosComparison: Story<SparkLineChartProps> = Template.bind({});

AllZerosComparison.args = {
  ...DEFAULT_PROPS,
  data: [DATA[1]],
};

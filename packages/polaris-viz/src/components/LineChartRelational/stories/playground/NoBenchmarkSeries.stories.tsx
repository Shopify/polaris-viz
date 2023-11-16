import type {Story} from '@storybook/react';

export {META as default} from '../meta';

import {DEFAULT_PROPS, Template} from '../data';
import type {LineChartProps} from 'components/LineChart/LineChart';

const DATA = [
  {
    data: [
      {
        value: 357.75,
        key: '2023-10-17T00:00:00-04:00',
      },
      {
        value: 1780,
        key: '2023-10-18T00:00:00-04:00',
      },
      {
        value: 2937.813,
        key: '2023-10-19T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-20T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-21T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-22T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-23T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-24T00:00:00-04:00',
      },
      {
        value: 15.78,
        key: '2023-10-25T00:00:00-04:00',
      },
      {
        value: 344.445,
        key: '2023-10-26T00:00:00-04:00',
      },
      {
        value: 1334.94,
        key: '2023-10-27T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-28T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-29T00:00:00-04:00',
      },
      {
        value: 205,
        key: '2023-10-30T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-10-31T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-11-01T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-11-02T00:00:00-04:00',
      },
      {
        value: 1046.64,
        key: '2023-11-03T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-11-04T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-11-05T00:00:00-04:00',
      },
      {
        value: 0,
        key: '2023-11-06T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-07T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-08T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-09T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-10T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-11T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-12T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-13T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-14T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-15T00:00:00-05:00',
      },
      {
        value: 0,
        key: '2023-11-16T00:00:00-05:00',
      },
    ],
    name: 'Average',
    color: [
      {
        offset: 0,
        color: 'rgba(10, 151, 213, 1)',
      },
      {
        offset: 100,
        color: 'rgba(80, 197, 247, 1)',
      },
    ],
  },
  {
    name: '25th percentile',
    color: 'rgba(143, 113, 239, 0.8)',
    metadata: {
      relatedIndex: 2,
      areaColor: 'rgba(143, 113, 239, 0.08)',
    },
    styleOverride: {
      line: {
        strokeDasharray: '3 3',
      },
    },
    data: [],
  },
  {
    name: 'Median',
    color: 'rgba(106, 66, 233, 0.8)',
    metadata: {
      relatedIndex: 3,
      areaColor: 'rgba(65, 22, 201, 0.12)',
    },
    styleOverride: {
      line: {
        strokeDasharray: '3 3',
      },
    },
    data: [],
  },
  {
    name: '75th percentile',
    color: 'rgba(65, 22, 201, 0.8)',
    styleOverride: {
      line: {
        strokeDasharray: '3 3',
      },
    },
    data: [],
  },
];

export const NoBenchmarkSeries: Story<LineChartProps> = Template.bind({});

NoBenchmarkSeries.args = {
  ...DEFAULT_PROPS,
  data: DATA,
  isAnimated: false,
};

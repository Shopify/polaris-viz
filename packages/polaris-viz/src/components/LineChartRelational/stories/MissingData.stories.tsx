import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_PROPS, Template} from './data';
import type {LineChartProps} from 'components/LineChart/LineChart';
import type {DataSeries} from '@shopify/polaris-viz-core';

export const MissingData: Story<LineChartProps> = Template.bind({});

const DATA: DataSeries[] = [
  {
    name: 'Apr 1 – Apr 14, 2020',
    data: [
      {value: 333, key: '2020-04-01T12:00:00'},
      {value: 797, key: '2020-04-02T12:00:00'},
      {value: 234, key: '2020-04-03T12:00:00'},
      {value: 534, key: '2020-04-04T12:00:00'},
      {value: 132, key: '2020-04-05T12:00:00'},
      {value: 159, key: '2020-04-06T12:00:00'},
      {value: 239, key: '2020-04-07T12:00:00'},
      {value: 708, key: '2020-04-08T12:00:00'},
      {value: 234, key: '2020-04-09T12:00:00'},
      {value: 645, key: '2020-04-10T12:00:00'},
      {value: 543, key: '2020-04-11T12:00:00'},
      {value: 89, key: '2020-04-12T12:00:00'},
      {value: 1000, key: '2020-04-13T12:00:00'},
      {value: 129, key: '2020-04-14T12:00:00'},
    ],
    color: [
      {offset: 0, color: '#986BFF'},
      {offset: 100, color: '#3AA4F6'},
    ],
    styleOverride: {
      line: {
        width: 3,
      },
    },
  },
  {
    name: '75th Percentile',
    data: [
      {value: 859, key: '2020-03-02T12:00:00'},
      {value: 388, key: '2020-03-01T12:00:00'},
      {value: 340, key: '2020-03-03T12:00:00'},
      {value: 240, key: '2020-03-04T12:00:00'},
      {value: 387, key: '2020-03-05T12:00:00'},
      {value: 760, key: '2020-03-07T12:00:00'},
      {value: 122, key: '2020-03-06T12:00:00'},
      {value: 162, key: '2020-03-08T12:00:00'},
      {value: 540, key: '2020-03-09T12:00:00'},
      {value: 193, key: '2020-03-10T12:00:00'},
      {value: 860, key: '2020-03-11T12:00:00'},
    ],
    color: '#9EDAEF',
    metadata: {
      relatedIndex: 2,
      areaColor: '#C8E7F4',
      shape: 'Bar',
    },
  },
  {
    name: 'Similar stores median',
    data: [
      {value: 759, key: '2020-03-02T12:00:00'},
      {value: 238, key: '2020-03-01T12:00:00'},
      {value: 190, key: '2020-03-03T12:00:00'},
      {value: 90, key: '2020-03-04T12:00:00'},
      {value: 237, key: '2020-03-05T12:00:00'},
      {value: 580, key: '2020-03-07T12:00:00'},
      {value: 172, key: '2020-03-06T12:00:00'},
      {value: 12, key: '2020-03-08T12:00:00'},
      {value: 390, key: '2020-03-09T12:00:00'},
      {value: 43, key: '2020-03-10T12:00:00'},
      {value: 710, key: '2020-03-11T12:00:00'},
    ],
    color: '#286A7B',
    metadata: {
      relatedIndex: 3,
      areaColor: '#F0F8FB',
    },
    styleOverride: {
      line: {
        strokeDasharray: '3 6',
        width: 3,
      },
    },
  },
  {
    name: '25th percentile',
    data: [
      {value: 559, key: '2020-03-02T12:00:00'},
      {value: 88, key: '2020-03-01T12:00:00'},
      {value: 40, key: '2020-03-03T12:00:00'},
      {value: 0, key: '2020-03-04T12:00:00'},
      {value: 87, key: '2020-03-05T12:00:00'},
      {value: 430, key: '2020-03-07T12:00:00'},
      {value: 22, key: '2020-03-06T12:00:00'},
      {value: 0, key: '2020-03-08T12:00:00'},
      {value: 240, key: '2020-03-09T12:00:00'},
      {value: 0, key: '2020-03-10T12:00:00'},
      {value: 540, key: '2020-03-11T12:00:00'},
    ],
    color: '#E0F1F8',
    metadata: {
      shape: 'Bar',
    },
  },
];

MissingData.args = {
  ...DEFAULT_PROPS,
  data: DATA,
  isAnimated: false,
};

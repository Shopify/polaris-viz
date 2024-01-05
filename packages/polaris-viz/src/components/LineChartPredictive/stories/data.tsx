import type {Story} from '@storybook/react';
import type {LineChartProps} from 'components/LineChart/LineChart';

import {LineChartPredictive} from '../LineChartPredictive';
import {
  formatLinearXAxisLabel,
  formatLinearYAxisLabel,
} from '../../../storybook/utilities';
import type {LineChartPredictiveDataSeries} from '../types';

export const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChartPredictive {...args} />;
};

export const DEFAULT_PROPS: Partial<LineChartProps> = {
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatLinearYAxisLabel},
  showLegend: false,
};

export const DEFAULT_DATA: LineChartPredictiveDataSeries[] = [
  {
    name: 'One',
    data: [
      {value: 88, key: '2020-03-01T12:00:00'},
      {value: 559, key: '2020-03-02T12:00:00'},
      {value: 40, key: '2020-03-03T12:00:00'},
      {value: 0, key: '2020-03-04T12:00:00'},
      {value: 87, key: '2020-03-05T12:00:00'},
      {value: 22, key: '2020-03-06T12:00:00'},
      {value: null, key: '2020-03-07T12:00:00'},
      {value: null, key: '2020-03-08T12:00:00'},
      {value: null, key: '2020-03-09T12:00:00'},
      {value: null, key: '2020-03-10T12:00:00'},
      {value: null, key: '2020-03-11T12:00:00'},
      {value: null, key: '2020-03-12T12:00:00'},
    ],
    styleOverride: {
      line: {
        hasArea: false,
      },
    },
  },
  {
    name: 'Predictive',
    data: [
      {value: null, key: '2020-03-01T12:00:00'},
      {value: null, key: '2020-03-02T12:00:00'},
      {value: null, key: '2020-03-03T12:00:00'},
      {value: null, key: '2020-03-04T12:00:00'},
      {value: null, key: '2020-03-05T12:00:00'},
      {value: 22, key: '2020-03-06T12:00:00'},
      {value: 430, key: '2020-03-07T12:00:00'},
      {value: 0, key: '2020-03-08T12:00:00'},
      {value: 240, key: '2020-03-09T12:00:00'},
      {value: 0, key: '2020-03-10T12:00:00'},
      {value: 540, key: '2020-03-11T12:00:00'},
      {value: 641, key: '2020-03-12T12:00:00'},
    ],
    metadata: {
      relatedIndex: 0,
      isPredictive: true,
      startKey: '2020-03-06T12:00:00',
    },
    styleOverride: {
      line: {
        strokeDasharray: '1 10 1',
        hasArea: false,
      },
    },
  },
  {
    name: 'Two',
    data: [
      {value: 23, key: '2020-03-01T12:00:00'},
      {value: 12, key: '2020-03-02T12:00:00'},
      {value: 234, key: '2020-03-03T12:00:00'},
      {value: 29, key: '2020-03-04T12:00:00'},
      {value: null, key: '2020-03-05T12:00:00'},
      {value: null, key: '2020-03-06T12:00:00'},
      {value: null, key: '2020-03-07T12:00:00'},
      {value: null, key: '2020-03-08T12:00:00'},
      {value: null, key: '2020-03-09T12:00:00'},
      {value: null, key: '2020-03-10T12:00:00'},
      {value: null, key: '2020-03-11T12:00:00'},
      {value: null, key: '2020-03-12T12:00:00'},
    ],
    styleOverride: {
      line: {
        hasArea: false,
      },
    },
  },
  {
    name: 'Two Predictive',
    data: [
      {value: null, key: '2020-03-01T12:00:00'},
      {value: null, key: '2020-03-02T12:00:00'},
      {value: null, key: '2020-03-03T12:00:00'},
      {value: 29, key: '2020-03-04T12:00:00'},
      {value: 23, key: '2020-03-05T12:00:00'},
      {value: 57, key: '2020-03-06T12:00:00'},
      {value: 43, key: '2020-03-07T12:00:00'},
      {value: 12, key: '2020-03-08T12:00:00'},
      {value: 23, key: '2020-03-09T12:00:00'},
      {value: 152, key: '2020-03-10T12:00:00'},
      {value: 300, key: '2020-03-11T12:00:00'},
      {value: 500, key: '2020-03-12T12:00:00'},
    ],
    metadata: {
      relatedIndex: 2,
      isPredictive: true,
      startKey: '2020-03-04T12:00:00',
    },
    styleOverride: {
      line: {
        strokeDasharray: '1 10 1',
        hasArea: false,
      },
    },
  },
  {
    name: 'Comparison',
    data: [
      {value: 458, key: '2020-03-01T12:00:00'},
      {value: 311, key: '2020-03-02T12:00:00'},
      {value: 245, key: '2020-03-03T12:00:00'},
      {value: 74, key: '2020-03-04T12:00:00'},
      {value: 228, key: '2020-03-05T12:00:00'},
      {value: 497, key: '2020-03-06T12:00:00'},
      {value: 46, key: '2020-03-07T12:00:00'},
      {value: 165, key: '2020-03-08T12:00:00'},
      {value: 200, key: '2020-03-09T12:00:00'},
      {value: 483, key: '2020-03-10T12:00:00'},
      {value: 255, key: '2020-03-11T12:00:00'},
      {value: 395, key: '2020-03-12T12:00:00'},
    ],
    isComparison: true,
    styleOverride: {
      line: {
        hasArea: false,
      },
    },
  },
];

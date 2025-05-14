import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {LineChartCumulativeProps} from '../LineChartCumulative';
import {LineChartCumulative} from '../LineChartCumulative';

export const Template: Story<LineChartCumulativeProps> = (
  args: LineChartCumulativeProps,
) => {
  return <LineChartCumulative {...args} />;
};

export const DEFAULT_PROPS: Partial<LineChartCumulativeProps> = {
  fixedActiveIndex: 6,
  isAnimated: false,
  xAxisOptions: {
    labelFormatter: (value: string) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return value;
      }
      return date.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
      });
    },
  },
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Previous period',
    data: [
      {value: 159, key: '2020-03-01T12:00:00'},
      {value: 188, key: '2020-03-02T12:00:00'},
      {value: 268, key: '2020-03-03T12:00:00'},
      {value: 300, key: '2020-03-04T12:00:00'},
      {value: 420, key: '2020-03-05T12:00:00'},
      {value: 489, key: '2020-03-07T12:00:00'},
      {value: 521, key: 'Today'},
      {value: 589, key: '2020-03-08T12:00:00'},
      {value: 638, key: '2020-03-09T12:00:00'},
      {value: 678, key: '2020-03-10T12:00:00'},
      {value: 791, key: '2020-03-11T12:00:00'},
      {value: 843, key: '2020-03-12T12:00:00'},
      {value: 910, key: '2020-03-13T12:00:00'},
      {value: 950, key: '2020-03-14T12:00:00'},
    ],
    isComparison: true,
  },
  {
    name: 'Previous period',
    data: [
      {value: 159, key: '2020-03-01T12:00:00'},
      {value: 188, key: '2020-03-02T12:00:00'},
      {value: 268, key: '2020-03-03T12:00:00'},
      {value: 300, key: '2020-03-04T12:00:00'},
      {value: 420, key: '2020-03-05T12:00:00'},
      {value: 489, key: '2020-03-07T12:00:00'},
      {value: 521, key: 'Today'},
    ],
    metadata: {
      isVisuallyHidden: true,
    },
  },
  {
    name: 'Apr 1 – Apr 14, 2020',
    data: [
      {value: 129, key: '2020-04-01T12:00:00'},
      {value: 208, key: '2020-04-02T12:00:00'},
      {value: 268, key: '2020-04-03T12:00:00'},
      {value: 300, key: '2020-04-04T12:00:00'},
      {value: 432, key: '2020-04-05T12:00:00'},
      {value: 591, key: '2020-04-06T12:00:00'},
      {value: 623, key: '2020-04-07T12:00:00'},
    ],
  },
];

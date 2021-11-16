import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {SimpleBarChart, SimpleBarChartProps} from '../SimpleBarChart';

import {THEME_CONTROL_ARGS} from '../../../storybook';
import type {DataPoint, DataSeries} from '../../../types';

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];
const GROUPS = [
  'Womens Leggings',
  'Mens Bottoms',
  'Mens Shorts',
  'Socks',
  'Hats',
  'Ties',
];

function buildSeries(items: number[] | number[][]): DataSeries[] {
  return LABELS.map((name, index) => {
    const data = GROUPS.map((name, groupIndex) => {
      const item = items[groupIndex];
      const array = Array.isArray(item) ? item : [item];

      if (array[index] == null) {
        return false;
      }

      return {
        key: name,
        value: array[index],
      };
    });

    return {
      name,
      data: data.filter(Boolean) as DataPoint[],
    };
  });
}

const SERIES = buildSeries([
  [3, 4, 7],
  [0, 0, 0],
  [4, 5, 6],
  [8, 15, 12],
  [48, 8, 50],
  [1, 5, 5],
]);

const CONTAINER_HEIGHT = 500;

const SINGLE_SERIES = buildSeries([3, 7, 4, 8, 4, 1, 4, 6]);

export default {
  title: 'Simple Charts/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    previewHeight: 'auto',
    docs: {
      description: {
        component: '',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      desciption:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`. Required.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    type: {
      description:
        'Changes the grouping of the bars. If `stacked` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group.',
    },
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: {
      description:
        'An object used to configure the labels displayed beside the bars.',
      defaultValue: {
        labelFormatter: (value: string) => value,
      },
    },
  },
} as Meta;

const Template: Story<SimpleBarChartProps> = (args: SimpleBarChartProps) => {
  return (
    <div style={{height: CONTAINER_HEIGHT}}>
      <SimpleBarChart {...args} />
    </div>
  );
};

export const Default: Story<SimpleBarChartProps> = Template.bind({});

Default.args = {
  data: SINGLE_SERIES,
};

export const MultipleSeries: Story<SimpleBarChartProps> = Template.bind({});

MultipleSeries.args = {
  data: SERIES,
};

export const ColorOverrides: Story<SimpleBarChartProps> = Template.bind({});

ColorOverrides.args = {
  data: [
    {
      name: 'Shirt',
      data: [
        {value: 4, key: 'Yesterday'},
        {value: 7, key: 'Today'},
      ],
      color: 'red',
    },
    {
      name: 'Pants',
      data: [
        {value: 5, key: 'Yesterday'},
        {value: 6, key: 'Today'},
      ],
    },
    {
      name: 'Shoes',
      data: [
        {value: 15, key: 'Yesterday'},
        {value: 12, key: 'Today'},
      ],
    },
  ],
};

export const SimpleStacked: Story<SimpleBarChartProps> = Template.bind({});

SimpleStacked.args = {
  data: SERIES,
  type: 'stacked',
};

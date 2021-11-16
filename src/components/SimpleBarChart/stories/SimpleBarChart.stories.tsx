import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {SimpleBarChart, SimpleBarChartProps} from '../SimpleBarChart';

import {THEME_CONTROL_ARGS} from '../../../storybook';
import type {DataSeries} from '../../../types';

const LABELS = ['BCFM 2019', 'BCFM 2020', 'BCFM 2021'];

function buildSeries(items: number[] | number[][]): DataSeries[] {
  return [
    'Womens Leggings',
    'Mens Bottoms',
    'Mens Shorts',
    'Socks',
    'Hats',
    'Ties',
  ].map((name, index) => {
    const item = items[index];
    const array = Array.isArray(item) ? item : [item];
    return {
      name,
      data: array.map((number, dataIndex) => {
        return {value: number, key: LABELS[dataIndex]};
      }),
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
  title: 'Charts/SimpleBarChart',
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
    series: {
      description: '',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    type: {
      description: '',
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
  series: SINGLE_SERIES,
};

export const SimpleStacked: Story<SimpleBarChartProps> = Template.bind({});

SimpleStacked.args = {
  series: SERIES,
  type: 'stacked',
};

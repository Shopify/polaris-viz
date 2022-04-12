import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {SparkLineChart, SparkLineChartProps} from '../';
import {THEME_CONTROL_ARGS} from '../../../storybook';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';


const DATA = [
  {
    data: [
      {key: 0, value: 100},
      {key: 1, value: 200},
      {key: 2, value: 300},
      {key: 3, value: 400},
      {key: 4, value: 400},
      {key: 5, value: 1000},
      {key: 6, value: 200},
      {key: 7, value: 800},
      {key: 8, value: 900},
      {key: 9, value: 200},
      {key: 10, value: 400},
    ],
  },
  {
    isComparison: true,
    data: [
      {key: 0, value: 200},
      {key: 1, value: 200},
      {key: 2, value: 200},
      {key: 3, value: 200},
      {key: 4, value: 200},
      {key: 5, value: 200},
      {key: 6, value: 200},
      {key: 7, value: 200},
      {key: 8, value: 200},
      {key: 9, value: 200},
      {key: 10, value: 200},
    ],
  },
];

export default {
  title: 'polaris-viz/Spark Charts/SparkLineChart',
  component: SparkLineChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. ',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{height: '100px', width: '200px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description:
        'The SparkLineChart can show one data series or a set of comparison data series. Each series is configured by the series item in the array.',
    },
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    offsetLeft: {
      description:
        'The amount of pixels to add as a left margin to the non-comparison line data.',
    },
    offsetRight: {
      description:
        'The amount of pixels to add as a right margin to the non-comparison line data.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SparkLineChartProps> = (args: SparkLineChartProps) => {
  return <SparkLineChart {...args} />;
};

const defaultProps: SparkLineChartProps = {
  data: DATA,
  isAnimated: true,
  accessibilityLabel: 'Customer growth over time',
};

export const Default: Story<SparkLineChartProps> = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const withoutSpline: Story<SparkLineChartProps> = Template.bind({});
withoutSpline.args = {
  ...defaultProps,
  theme: 'NoSpline',
};

export const OffsetAndNulls: Story<SparkLineChartProps> = Template.bind({});
OffsetAndNulls.args = {
  ...defaultProps,
  offsetRight: 12,
  offsetLeft: 50,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: 50},
        {key: 2, value: null},
        {key: 3, value: 200},
        {key: 4, value: 400},
        {key: 5, value: 1000},
        {key: 6, value: 200},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 100},
      ],
    },
    {
      isComparison: true,
      data: [
        {key: 0, value: 20},
        {key: 1, value: 20},
        {key: 2, value: 20},
        {key: 3, value: 20},
        {key: 4, value: 20},
        {key: 5, value: 20},
        {key: 6, value: 20},
        {key: 7, value: 20},
        {key: 8, value: 20},
        {key: 9, value: 20},
        {key: 10, value: 20},
      ],
    },
  ],
};

export const OverwrittenSeriesColors: Story<SparkLineChartProps> =
  Template.bind({});
OverwrittenSeriesColors.args = {
  ...defaultProps,
  data: [
    {
      isComparison: true,
      data: [
        {key: 0, value: 200},
        {key: 1, value: 200},
        {key: 2, value: 200},
        {key: 3, value: 200},
        {key: 4, value: 200},
        {key: 5, value: 200},
        {key: 6, value: 200},
        {key: 7, value: 200},
        {key: 8, value: 200},
        {key: 9, value: 200},
        {key: 10, value: 200},
      ],
    },
    {
      color: 'lime',
      data: [
        {key: 0, value: 100},
        {key: 1, value: 200},
        {key: 2, value: 300},
        {key: 3, value: 400},
        {key: 4, value: 400},
        {key: 5, value: 1000},
        {key: 6, value: 200},
        {key: 7, value: 800},
        {key: 8, value: 900},
        {key: 9, value: 200},
        {key: 10, value: 400},
      ],
    },
  ],
};

export const ZeroSeries: Story<SparkLineChartProps> = Template.bind({});
ZeroSeries.args = {
  ...defaultProps,
  data: [
    {
      isComparison: true,
      data: [
        {key: 0, value: 200},
        {key: 1, value: 200},
        {key: 2, value: 200},
        {key: 3, value: 200},
        {key: 4, value: 200},
        {key: 5, value: 200},
        {key: 6, value: 200},
        {key: 7, value: 200},
        {key: 8, value: 200},
        {key: 9, value: 200},
        {key: 10, value: 200},
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

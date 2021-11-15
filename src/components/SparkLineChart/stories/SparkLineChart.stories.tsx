import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {SparkLineChart, SparkLineChartProps} from '../';
import {THEME_CONTROL_ARGS} from '../../../storybook';

const series = [
  {
    hasPoint: true,
    data: [
      {x: 0, y: 100},
      {x: 1, y: 200},
      {x: 2, y: 300},
      {x: 3, y: 400},
      {x: 4, y: 400},
      {x: 5, y: 1000},
      {x: 6, y: 200},
      {x: 7, y: 800},
      {x: 8, y: 900},
      {x: 9, y: 200},
      {x: 10, y: 400},
    ],
  },
  {
    lineStyle: 'dashed' as 'dashed',
    area: undefined,
    data: [
      {x: 0, y: 200},
      {x: 1, y: 200},
      {x: 2, y: 200},
      {x: 3, y: 200},
      {x: 4, y: 200},
      {x: 5, y: 200},
      {x: 6, y: 200},
      {x: 7, y: 200},
      {x: 8, y: 200},
      {x: 9, y: 200},
      {x: 10, y: 200},
    ],
  },
];

export default {
  title: 'Charts/SparkLineChart',
  component: SparkLineChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. <br /><br />  This component inherits its height and width from its container.',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{width: '100px', height: '50px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    series: {
      description:
        'The SparkLineChart can show one data series or a set of comparison data series. Each series is configured by the series item in the array. [Series type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/SparkLineChart/SparkLineChart.tsx#L21)',
    },
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<SparkLineChartProps> = (args: SparkLineChartProps) => {
  return (
    <div style={{width: '200px', height: '100px'}}>
      <SparkLineChart {...args} />
    </div>
  );
};

const defaultProps = {
  series,
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
  series: [
    {
      color: 'rgb(255, 85, 70)',
      area: 'rgba(255, 85, 70, 0.1)',
      hasPoint: true,
      offsetRight: 12,
      offsetLeft: 50,
      data: [
        {x: 0, y: 100},
        {x: 1, y: 50},
        {x: 2, y: null},
        {x: 3, y: 200},
        {x: 4, y: 400},
        {x: 5, y: 1000},
        {x: 6, y: 200},
        {x: 7, y: 800},
        {x: 8, y: 900},
        {x: 9, y: 200},
        {x: 10, y: 100},
      ],
    },
    {
      color: 'rgb(255, 85, 70)',
      lineStyle: 'dashed',
      area: undefined,
      data: [
        {x: 0, y: 20},
        {x: 1, y: 20},
        {x: 2, y: 20},
        {x: 3, y: 20},
        {x: 4, y: 20},
        {x: 5, y: 20},
        {x: 6, y: 20},
        {x: 7, y: 20},
        {x: 8, y: 20},
        {x: 9, y: 20},
        {x: 10, y: 20},
      ],
    },
  ],
};

export const ZeroSeries: Story<SparkLineChartProps> = Template.bind({});
ZeroSeries.args = {
  ...defaultProps,
  series: [
    {
      hasPoint: true,
      data: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 4, y: 0},
        {x: 5, y: 0},
        {x: 6, y: 0},
        {x: 7, y: 0},
        {x: 8, y: 0},
        {x: 9, y: 0},
        {x: 10, y: 0},
      ],
    },
    {
      lineStyle: 'dashed',
      area: undefined,
      data: [
        {x: 0, y: 200},
        {x: 1, y: 200},
        {x: 2, y: 200},
        {x: 3, y: 200},
        {x: 4, y: 200},
        {x: 5, y: 200},
        {x: 6, y: 200},
        {x: 7, y: 200},
        {x: 8, y: 200},
        {x: 9, y: 200},
        {x: 10, y: 200},
      ],
    },
  ],
};

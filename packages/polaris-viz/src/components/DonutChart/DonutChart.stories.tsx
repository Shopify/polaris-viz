import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import {THEME_CONTROL_ARGS} from '../../storybook';
import {DonutChart} from '.';
import type {DonutChartProps} from './DonutChart';

const meta: Meta<DonutChartProps> = {
  title: 'polaris-viz/Default Charts/DonutChart',
  component: DonutChart,
  parameters: {
    a11y: {disable: true},
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Circular statistical graphic, which is divided into slices to illustrate numerical proportion.',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    theme: THEME_CONTROL_ARGS,
  },
  decorators: [
    (Story) => <div style={{width: 200, height: 200}}>{Story()}</div>,
  ],
};

export default meta;

const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  data: [
    {
      data: [{key: 'Shopify Payments', value: 50000}],
    },
    {
      data: [{key: 'PayPal', value: 25000}],
    },
    {
      data: [{key: 'Other', value: 10000}],
    },
    {
      data: [{key: 'Amazon Pay', value: 4000}],
    },
  ],
  comparisonMetric: {
    metric: '10%',
    trend: 'negative',
    accessibilityLabel: 'trending down 10%',
  },
};

export const SingleDataPoint = Template.bind({});

SingleDataPoint.args = {
  data: [
    {
      data: [{key: 'Engagement', value: 25000}],
    },
  ],
  comparisonMetric: {
    metric: '6%',
    trend: 'positive',
    accessibilityLabel: 'trending up 6%',
  },
};

export const CustomColors = Template.bind({});

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

CustomColors.args = {
  data: [
    {
      data: [{key: 'Shopify Payments', value: 50000}],
      color: [
        {
          color: negativePurple,
          offset: 0,
        },
        {
          color: purple,
          offset: 50,
        },
        {
          color: green,
          offset: 100,
        },
      ],
    },
    {
      data: [{key: 'PayPal', value: 25000}],
      color: [
        {
          color: 'magenta',
          offset: 100,
        },
        {
          color: 'lime',
          offset: 200,
        },
      ],
    },
    {
      data: [{key: 'Amazon Pay', value: 4000}],
    },
  ],
  comparisonMetric: {
    metric: '6%',
    trend: 'positive',
    accessibilityLabel: 'trending up 6%',
  },
};

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
    (Story) => <div style={{width: 400, height: 300}}>{Story()}</div>,
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
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
    },
    {
      name: 'Paypal',
      data: [{key: 'april - march', value: 25000}],
    },
    {
      name: 'Other',
      data: [{key: 'april - march', value: 10000}],
    },
    {
      name: 'Amazon Pay',
      data: [{key: 'april - march', value: 4000}],
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
    },
    {
      data: [{key: 'PayPal', value: 25000}],
      color: [
        {
          color: 'magenta',
          offset: 35,
        },
        {
          color: 'lime',
          offset: 55,
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

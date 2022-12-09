import React from 'react';
import type {StoryFn} from '@storybook/react';

import {DonutChart, DonutChartProps} from '../DonutChart';

export const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

export const DEFAULT_PROPS: Partial<DonutChartProps> = {
  comparisonMetric: {
    metric: '6%',
    trend: 'positive',
    accessibilityLabel: 'trending up 6%',
  },
  legendPosition: 'left',
};

export const DEFAULT_DATA = [
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
];

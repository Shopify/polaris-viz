import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {Template} from './data';

export const ErrorState: Story<DonutChartProps> = Template.bind({});

ErrorState.args = {
  data: [
    {
      name: 'Engagement',
      data: [{key: 'april - march', value: 25000}],
    },
  ],
  comparisonMetric: {
    metric: '6%',
    trend: 'positive',
    accessibilityLabel: 'trending up 6%',
  },
  state: ChartState.Error,
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {Template} from './data';

export const SingleDataPoint: Story<DonutChartProps> = Template.bind({});

SingleDataPoint.args = {
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
  legendPosition: 'left',
};

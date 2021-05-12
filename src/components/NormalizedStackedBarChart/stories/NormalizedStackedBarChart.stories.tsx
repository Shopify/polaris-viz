import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  NormalizedStackedBarChart,
  NormalizedStackedBarChartProps,
} from '../NormalizedStackedBarChart';

export default {
  title: 'NormalizedStackedBarChart',
  component: NormalizedStackedBarChart,
} as Meta;

const Template: Story<NormalizedStackedBarChartProps> = (
  args: NormalizedStackedBarChartProps,
) => {
  return <NormalizedStackedBarChart {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  data: [
    {
      label: 'Direct',
      value: 200,
      formattedValue: '$200',
      comparisonMetric: {
        metric: '5',
        trend: 'positive',
        accessibilityLabel: 'Increase of',
      },
    },
    {
      label: 'Facebook',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '5',
        trend: 'negative',
        accessibilityLabel: 'Decrease of',
      },
    },
    {
      label: 'Twitter',
      value: 100,
      formattedValue: '$100',
      comparisonMetric: {
        metric: '5',
        trend: 'neutral',
        accessibilityLabel: 'Decrease of',
      },
    },
    {
      label: 'Google',
      value: 20,
      formattedValue: '$20',
    },
  ],
  colors: ['primary', 'secondary', 'tertiary', 'quaternary'],
  orientation: 'horizontal',
  size: 'large',
};

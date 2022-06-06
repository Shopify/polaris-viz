import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

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
        'Array of `ArcData` that determine what each arc should look like, as well as providing the data to be plotted.',
    },
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
    trend: 'positive',
    accessibilityLabel: 'trending up 10%',
  },
};

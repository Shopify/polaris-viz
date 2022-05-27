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
    (Story) => <div style={{width: 400, height: 200}}>{Story()}</div>,
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
};

import React from 'react';
import {Story, Meta} from '@storybook/react';

import {DonutChart} from '../../../components';
import type {DonutChartProps} from '../../../components';

function valueFormatter(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

const meta: Meta = {
  title: 'Charts/DonutChart',
  component: DonutChart,
  parameters: {
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
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    data: {
      description:
        'Array of `ArcData` that determine what each arc should look like, as well as providing the data to be plotted.',
    },
    sort: {
      description: 'If provided it will sort the data plotted on the chart',
      options: ['asc', 'desc', 'none'],
      mapping: {
        asc: 'asc',
        desc: 'desc',
        none: undefined,
      },
      control: {type: 'select'},
    },
    valueFormatter: {
      description:
        'This accepts a function that is called to format the values used for the arcs.',
    },
    onHover: {
      description: 'A function that is triggered when an arc gains focus.',
    },
    onBlur: {
      description: 'A function that is triggered when an arc loses focus.',
    },
    hideTooltip: {
      description: 'If provided it does not render the tooltip for each arc.',
      control: {type: 'boolean'},
      defaultValue: false,
    },
  },
  args: {
    accessibilityLabel: 'Payment providers',
    data: [
      {label: 'Other', value: 10000, color: 'colorBlue'},
      {
        label: 'Shopify Payments',
        value: 30000,
        color: 'colorGreen',
      },
      {label: 'Amazon Pay', value: 4000, color: 'colorIndigo'},
      {label: 'PayPal', value: 25000, color: 'colorTeal'},
    ],
    valueFormatter,
    sort: 'asc',
  },
  decorators: [
    (Story) => <div style={{width: 200, height: 200}}>{Story()}</div>,
  ],
};

export default meta;

const Template: Story<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

export const SolidColor = Template.bind({});

SolidColor.args = {};

export const WithContent = Template.bind({});

WithContent.args = {
  comparisonMetric: -2,
};

export const EmptyState = Template.bind({});

EmptyState.args = {
  data: [],
};

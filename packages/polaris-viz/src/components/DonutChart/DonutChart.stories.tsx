import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import {DonutChart} from '.';
import type {DonutChartProps} from '.';

function valueFormatter(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

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
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    data: {
      description:
        'Array of `ArcData` that determine what each arc should look like, as well as providing the data to be plotted.',
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
    comparisonMetric: {
      description: 'Percentage for a comparison metric',
    },
    total: {
      description:
        'Total value to display in the center of the chart. If empty, the sum of values passed to `data` will be used.',
    },
    activeArcId: {
      description: 'Highlights a specific arc',
    },
  },
  args: {
    accessibilityLabel: 'Payment providers',
    data: [
      {id: 20, label: 'Shopify Payments', value: 50000, color: 'blue'},
      {id: 40, label: 'PayPal', value: 25000, color: 'magenta'},
      {id: 10, label: 'Other', value: 10000, color: 'purple'},
      {id: 30, label: 'Amazon Pay', value: 4000, color: 'teal'},
    ],
    valueFormatter,
  },
  decorators: [
    (Story) => <div style={{width: 200, height: 200}}>{Story()}</div>,
  ],
};

export default meta;

const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

// const DualTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
//   return (
//     <>
//       <DonutChart {...args} />
//       <div style={{marginTop: '2rem'}} />
//       <DonutChart {...args} accessibilityLabel="Earnings" />
//     </>
//   );
// };

export const SolidColor = Template.bind({});

SolidColor.args = {};

// export const WithContent = Template.bind({});

// WithContent.args = {
//   comparisonMetric: -0.2,
//   total: 70000,
// };

// export const AllColors = Template.bind({});

// export const Multiple = DualTemplate.bind({});

// AllColors.args = {
//   data: [
//     {
//       id: 1,
//       label: 'Hello World',
//       value: 36,
//       color: 'teal',
//     },
//     {
//       id: 2,
//       label: 'Someone Help',
//       value: 35,
//       color: 'blue',
//     },
//     {
//       id: 3,
//       label: 'How doin?',
//       value: 12,
//       color: 'indigo',
//     },
//     {
//       id: 4,
//       label: 'More Data',
//       value: 19,
//       color: 'purple',
//     },
//     {
//       id: 5,
//       label: 'Growing Data',
//       value: 26,
//       color: 'magenta',
//     },
//     {
//       id: 6,
//       label: 'Money Stuff',
//       value: 4,
//       color: 'orange',
//     },
//     {
//       id: 7,
//       label: 'Value Prop',
//       value: 31,
//       color: 'yellow',
//     },
//   ],
// };

// export const EmptyState = Template.bind({});

// EmptyState.args = {
//   data: [],
// };

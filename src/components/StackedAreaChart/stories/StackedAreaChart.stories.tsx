import React from 'react';
import {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';

import {data, labels, formatYAxisLabel} from './utils.stories';
import {
  colorPurpleDark,
  colorTeal,
  VIZ_GRADIENT_COLOR,
} from '../../../constants';

const tooltipContent = {
  empty: undefined,
  Custom: ({data}) => (
    <div
      style={{
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
      }}
    >
      {data.map(() => (
        <div>{`${x.label}: ${x.value}`}</div>
      ))}
    </div>
  ),
};

export default {
  title: 'Charts/StackedAreaChart',
  component: StackedAreaChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives. <br /> This component inherits its height and width from its container.',
      },
    },
  },
  argTypes: {
    series: {
      description:
        'The `Series` type gives the user flexibility to define what each series/area should look like, as well as providing the data to be plotted. [Series type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/StackedAreaChart/types.ts#L3)',
    },
    xAxisLabels: {
      description: 'The labels to display on the x axis of the chart.',
    },
    isAnimated: {
      description:
        'Whether to animate the chart when it is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    formatXAxisLabel: {
      description:
        'This accepts a function that is called to format the labels when the chart draws its X axis. This is only called if there is a value passed in for `xAxisLabels`. [StringLabelFormatter type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/types.ts#L108)',
    },
    formatYAxisLabel: {
      description:
        'The `formatYAxisLabel` function formats the values displayed on the yAxis and in the tooltip. [NumberLabelFormatter type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/types.ts#L114)',
    },
    renderTooltipContent: {
      options: Object.keys(tooltipContent),
      mapping: tooltipContent,
      control: {
        type: 'select',
        labels: {
          empty: 'Default',
          Annotation: 'Custom',
        },
      },
      description:
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to the tooltip. [TooltipData type definition.]()',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    theme: {
      description: 'The theme that the chart will inherit its styles from',
    },
  },
} as Meta;

const defaultProps = {
  series: data,
  skipLinkText: 'Skip chart content',
  xAxisLabels: labels,
  formatYAxisLabel: formatYAxisLabel,
  isAnimated: true,
  theme: 'Default',
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};
export const Default = Template.bind({});
Default.args = defaultProps;

export const Gradients = Template.bind({});
Gradients.args = {
  ...defaultProps,
  xAxisLabels: Array(5)
    .fill(null)
    .map(() => 'label'),
  series: [
    {
      name: 'One',
      data: Array(5)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
      color: VIZ_GRADIENT_COLOR.negative.down,
    },
    {
      name: 'Two',
      data: Array(5)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
  ],
};

export const LargeVolume = Template.bind({});
LargeVolume.args = {
  ...defaultProps,
  xAxisLabels: Array(2000)
    .fill(null)
    .map(() => 'label'),
  series: [
    {
      name: 'First-time',
      data: Array(2000)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
      color: colorTeal,
    },
    {
      name: 'Returning',
      data: Array(2000)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
      color: colorPurpleDark,
    },
  ],
};

export const MediumVolume = Template.bind({});
MediumVolume.args = {
  ...defaultProps,
  xAxisLabels: Array(10)
    .fill(null)
    .map(() => 'label'),
  series: [
    {
      name: 'One',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Two',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Three',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Four (Custom Color)',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
      color: '#ff1111',
    },
    {
      name: 'Five',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Six',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Seven',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Eight',
      data: Array(10)
        .fill(null)
        .map(() => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
  ],
};

import React from 'react';
import {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps, PolarisVizProvider} from '../../../components';

import {formatXAxisLabel, defaultProps} from './utils.stories';
import {THEME_CONTROL_ARGS} from '../../../storybook';

const tooltipContent = {
  empty: undefined,
  Custom: ({label, value}) => (
    <div
      style={{
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
      }}
    >
      {`${formatXAxisLabel(label)}: ${value}`}
    </div>
  ),
};

export default {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component:
          'Used to show comparison across categories or time. <br /> This component inherits its height and width from its container.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    annotations: {
      control: {
        type: 'select',
      },
      description:
        'An array of annotations to show on the chart. [Annotation type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/BarChart/types.ts#L61)',
      options: ['No annotation', 'Annotation on second bar'],
      mapping: {
        'No annotation': undefined,
        'Annotation on second bar': [
          {
            dataIndex: 1,
            xOffset: 0.5,
            width: 5,
            color: 'gray',
            ariaLabel: 'Median: 1.5',
            tooltipData: {
              label: 'Median',
              value: '1.5 hours',
            },
          },
        ],
      },
    },
    renderTooltipContent: {
      description:
        'Accepts a function that renders the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<BarChartTooltipContent />`. [RenderTooltipContentData type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/BarChart/types.ts#L23)',
      options: Object.keys(tooltipContent),
      mapping: tooltipContent,
      control: {
        type: 'select',
        labels: {
          empty: 'Default',
          Annotation: 'Custom',
        },
      },
    },
    data: {
      description: 'Data represented as bars. Required.',
    },
    emptyStateText: {
      description:
        'Used to indicate to screenreaders that a chart with no data has been rendered, in the case that an empty array is passed as the data. It is strongly recommended that this is included if the data prop could be an empty array.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    xAxisOptions: {
      description: 'An object used to configure the xAxis and its labels.',
    },
    yAxisOptions: {
      description: 'An object used to configure the yAxis and its labels.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const Default: Story<BarChartProps> = Template.bind({});
Default.args = {
  ...defaultProps,
  xAxisOptions: {
    labelFormatter: defaultProps.xAxisOptions.labelFormatter,
  },
  yAxisOptions: {
    labelFormatter: defaultProps.yAxisOptions.labelFormatter,
  },
};

export const NoXAxis: Story<BarChartProps> = Template.bind({});
NoXAxis.args = {
  ...defaultProps,
  xAxisOptions: {
    hide: true,
  },
};

export const Annotations: Story<BarChartProps> = Template.bind({});
Annotations.args = {
  ...defaultProps,
  data: [
    {rawValue: 45, label: '1'},
    {rawValue: 16, label: '2'},
    {rawValue: 9, label: '3'},
    {rawValue: 32, label: '4'},
    {rawValue: 85, label: '5'},
    {rawValue: 74, label: '6'},
    {rawValue: 110, label: '7'},
    {rawValue: 58, label: '8'},
    {rawValue: 40, label: '9'},
    {rawValue: 58, label: '10'},
    {rawValue: 64, label: '11'},
    {rawValue: 9, label: '12'},
  ],
  annotations: [
    {
      dataIndex: 1,
      xOffset: 0.5,
      width: 5,
      color: 'gray',
      ariaLabel: 'Median: 1.5',
      tooltipData: {
        label: 'Median',
        value: '1.5 hours',
      },
    },
  ],
};

export const LastBarTreatment: Story<BarChartProps> = Template.bind({});
LastBarTreatment.args = {
  ...defaultProps,
  data: [
    {rawValue: 1324.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 1022.79, label: '2020-01-02T12:00:00Z'},
    {rawValue: 713.29, label: '2020-01-03T12:00:00Z'},
    {rawValue: 413.29, label: '2020-01-04T12:00:00Z'},
    {rawValue: 100.79, label: '2020-01-05T12:00:00Z'},
    {rawValue: 350.6, label: '2020-01-06T12:00:00Z'},
    {rawValue: 277.69, label: '2020-01-07T12:00:00Z'},
    {rawValue: 10, label: '2020-01-08T12:00:00Z'},
    {
      rawValue: 950.19,
      label: '2020-01-09T12:00:00Z',
      barColor: 'yellow',
    },
  ],
};

export const MinimalLabels: Story<BarChartProps> = Template.bind({});
MinimalLabels.args = {
  ...defaultProps,
  data: [
    {rawValue: 1324.19, label: '1 day'},
    {rawValue: 1022.79, label: '2 days'},
    {rawValue: 713.29, label: '3 days'},
    {rawValue: 413.29, label: '4 days'},
    {
      rawValue: 100.79,
      label: '5 days',
    },
    {rawValue: 350.6, label: '6 days'},
    {rawValue: 277.69, label: '7 days'},
    {
      rawValue: 10,
      label: '8 days',
    },
    {
      rawValue: 10,
      label: '9 days',
    },
    {
      rawValue: 10,
      label: '10 days',
    },
    {
      rawValue: 10,
      label: '11 days',
    },
    {
      rawValue: 10,
      label: '12 days',
    },
  ],
  xAxisOptions: {
    ...defaultProps.xAxisOptions,
    labelFormatter: (label: string) => label,
    useMinimalLabels: true,
  },
};

export const IntegersOnly: Story<BarChartProps> = Template.bind({});
IntegersOnly.args = {
  ...defaultProps,
  data: [
    {rawValue: 0.19, label: '2020-01-01T12:00:00Z'},
    {rawValue: 1.29, label: '2020-01-02T12:00:00Z'},
    {rawValue: 1.79, label: '2020-01-03T12:00:00Z'},
    {rawValue: 0.6, label: '2020-01-04T12:00:00Z'},
    {rawValue: 1.69, label: '2020-01-05T12:00:00Z'},
    {rawValue: 0.19, label: '2020-01-06T12:00:00Z'},
  ],
  yAxisOptions: {
    ...defaultProps.yAxisOptions,
    integersOnly: true,
  },
};

export const LargeVolume: Story<BarChartProps> = Template.bind({});
LargeVolume.args = {
  ...defaultProps,
  data: Array(1000)
    .fill(null)
    .map((x) => {
      return {
        rawValue: Math.random() * Math.random() * 100,
        label: Math.random().toString(),
      };
    }),
};

const NonRoundCornersTemplate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          bar: {
            hasRoundedCorners: false,
          },
        },
      }}
    >
      <BarChart {...args} />
    </PolarisVizProvider>
  );
};

export const NonRoundCorners = NonRoundCornersTemplate.bind({});
NonRoundCorners.args = defaultProps;

const NoOverflowStyleTemplate: Story<BarChartProps> = (args: BarChartProps) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
          grid: {
            horizontalOverflow: false,
            horizontalMargin: 0,
          },
        },
      }}
    >
      <BarChart {...args} />
    </PolarisVizProvider>
  );
};

export const NoOverflowStyle = NoOverflowStyleTemplate.bind({});
NoOverflowStyle.args = defaultProps;

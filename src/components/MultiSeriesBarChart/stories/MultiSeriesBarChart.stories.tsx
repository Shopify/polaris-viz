import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  MultiSeriesBarChart,
  MultiSeriesBarChartProps,
} from 'components';

import styles from 'components/MultiSeriesBarChart/stories/MultiSeriesBarChart.stories.scss';
import {SquareColorPreview} from 'components/SquareColorPreview';
import {PolarisVizProvider} from 'components/PolarisVizProvider';
import {THEME_CONTROL_ARGS} from 'storybook';

const tooltipContent = {
  empty: undefined,
  Custom: ({data, title}) => (
    <div
      style={{
        background: 'black',
        padding: '8px',
        borderRadius: '4px',
        color: 'white',
      }}
    >
      {title}
      <div>
        {data.map(({label, value, color}) => (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '12px 1fr 1fr',
              gridGap: '5px',
              fontSize: '12px',
              marginTop: '4px',
            }}
          >
            <SquareColorPreview color={color} />
            <div>{label}</div>
            <div style={{textAlign: 'right'}}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

const series = [
  {
    name: 'Breakfast',
    data: [
      {label: 'Monday', rawValue: 3},
      {label: 'Tuesday', rawValue: -7},
      {label: 'Wednesday', rawValue: 4},
      {label: 'Thursday', rawValue: 8},
      {label: 'Friday', rawValue: 50},
      {label: 'Saturday', rawValue: 0},
      {label: 'Sunday', rawValue: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {label: 'Monday', rawValue: 4},
      {label: 'Tuesday', rawValue: 0},
      {label: 'Wednesday', rawValue: 5},
      {label: 'Thursday', rawValue: 15},
      {label: 'Friday', rawValue: 8},
      {label: 'Saturday', rawValue: 50},
      {label: 'Sunday', rawValue: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {label: 'Monday', rawValue: 7},
      {label: 'Tuesday', rawValue: 0},
      {label: 'Wednesday', rawValue: 6},
      {label: 'Thursday', rawValue: 12},
      {label: 'Friday', rawValue: 50},
      {label: 'Saturday', rawValue: 5},
      {label: 'Sunday', rawValue: 0.1},
    ],
  },
];

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default {
  title: 'Charts/MultiSeriesBarChart',
  component: MultiSeriesBarChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side. <br /> This component inherits its height and width from its container.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    series: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors`  defined in `PolarisVizProvider`',
    },
    emptyStateText: {
      description:
        'Used to indicate to screenreaders that a chart with no series data has been rendered, in the case that an empty array is passed as the data. It is strongly recommended that this is included if the series prop could be an empty array.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences. Note: animations are currently only available for the non-stacked bar chart.',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    barOptions: {
      description: 'An object that defines the bars.',
    },
    xAxisOptions: {
      description: 'An object that defines the xAxis and its labels.',
    },
    yAxisOptions: {
      description: 'An object that defines the yAxis and its labels.',
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
        'This accepts a function that is called to render the tooltip content. By default it calls `formatYAxisLabel` to format the the tooltip value and passes it to `<TooltipContent />`. [RenderTooltipContentData type definition.]()',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
  return <MultiSeriesBarChart {...args} />;
};

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

const barGradient1 = [
  {
    color: negativePurple,
    offset: 0,
  },
  {
    color: purple,
    offset: 50,
  },
  {
    color: green,
    offset: 100,
  },
];
const barGradient2 = [
  {
    color: '#374352',
    offset: 0,
  },
  {
    color: '#4d5e73',
    offset: 50,
  },
];

const gradientSeries = series
  .map((serie, index) => ({
    ...serie,
    color: index % 2 === 0 ? barGradient1 : barGradient2,
  }))
  .filter((_, index) => index < 2);

export const Default: Story<MultiSeriesBarChartProps> = Template.bind({});

Default.args = {
  series: series,
  xAxisOptions: {labels},
  isAnimated: true,
};

const NoOverflowStyleTemplate: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
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
      <MultiSeriesBarChart {...args} />
    </PolarisVizProvider>
  );
};

export const NoOverflowStyle = NoOverflowStyleTemplate.bind({});
NoOverflowStyle.args = {
  series: series,
  xAxisOptions: {labels},
};

export const NoXAxis = Template.bind({});
NoXAxis.args = {
  series: series,
  xAxisOptions: {labels, hide: true},
};

const WithoutRoundedCornersTemplate: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
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
      <MultiSeriesBarChart {...args} />
    </PolarisVizProvider>
  );
};

export const WithoutRoundedCorners: Story<MultiSeriesBarChartProps> = WithoutRoundedCornersTemplate.bind(
  {},
);
WithoutRoundedCorners.args = {
  series: series,
  xAxisOptions: {labels},
};

export const Stacked: Story<MultiSeriesBarChartProps> = Template.bind({});
Stacked.args = {
  series: series,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const OverwrittenSeriesColors: Story<MultiSeriesBarChartProps> = Template.bind(
  {},
);
OverwrittenSeriesColors.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const IntegersOnly: Story<MultiSeriesBarChartProps> = Template.bind({});
IntegersOnly.args = {
  series: [
    {
      name: 'Breakfast',
      data: [
        {label: 'Monday', rawValue: 2},
        {label: 'Tuesday', rawValue: 0.1},
        {label: 'Wednesday', rawValue: 0.78},
        {label: 'Thursday', rawValue: 0.12},
        {label: 'Friday', rawValue: 0.7},
        {label: 'Saturday', rawValue: 0.3},
        {label: 'Sunday', rawValue: 0.6},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {label: 'Monday', rawValue: 0},
        {label: 'Tuesday', rawValue: 0.1},
        {label: 'Wednesday', rawValue: 0.12},
        {label: 'Thursday', rawValue: 0.34},
        {label: 'Friday', rawValue: 1.6},
        {label: 'Saturday', rawValue: 0.21},
        {label: 'Sunday', rawValue: 0.1},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {label: 'Monday', rawValue: 1.23},
        {label: 'Tuesday', rawValue: 1.42},
        {label: 'Wednesday', rawValue: 2},
        {label: 'Thursday', rawValue: 1.2},
        {label: 'Friday', rawValue: 0.5},
        {label: 'Saturday', rawValue: 0.12},
        {label: 'Sunday', rawValue: 2},
      ],
    },
  ],
  xAxisOptions: {labels},
  yAxisOptions: {integersOnly: true},
};

export const LargeVolume: Story<MultiSeriesBarChartProps> = Template.bind({});
LargeVolume.args = {
  series: [
    {
      name: 'Breakfast',
      data: Array(200)
        .fill(null)
        .map((x) => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Lunch',
      data: Array(200)
        .fill(null)
        .map((x) => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: Math.random().toString(),
          };
        }),
    },
  ],
  xAxisOptions: {
    labels: Array(200)
      .fill(null)
      .map((x) => 'some label'),
  },
};

export const NegativeOnly = Template.bind({});
NegativeOnly.args = {
  series: [
    {
      name: 'Breakfast',
      data: IntegersOnly.args.series[0].data.map(({label, rawValue}) => {
        return {label, rawValue: rawValue * -1};
      }),
    },
    {
      name: 'Lunch',
      data: IntegersOnly.args.series[1].data.map(({label, rawValue}) => {
        return {label, rawValue: rawValue * -1};
      }),
    },
    {
      name: 'Dinner',
      data: IntegersOnly.args.series[2].data.map(({label, rawValue}) => {
        return {label, rawValue: rawValue * -1};
      }),
    },
  ],
  xAxisOptions: {labels},
  yAxisOptions: {integersOnly: true},
};

import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../components';

import {SquareColorPreview} from '../SquareColorPreview';
import {PolarisVizProvider} from '../PolarisVizProvider';
import {
  DIRECTION_CONTROL_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
} from '../../storybook';

import {generateMultipleSeriesNewData} from '../../../documentation/utilities';
import type {DataSeries} from '../../types';

const tooltipContent = {
  empty: undefined,
  Custom: ({
    data,
    title,
  }: {
    data: {label: string; value: number; color: string}[];
    title: string;
  }) => (
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

const data: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: 4},
      {key: 'Thursday', value: 8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 5},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: 6},
      {key: 'Thursday', value: 12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

export default {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    docs: {
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side. It is recommended that you use a legend whenever displaying multi-series data. To display one, use the `<Legend />` component. <br /> <br /> This component inherits its height and width from its container.',
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
      description: 'An array of annotations to show on the chart.',
      options: ['No annotation', 'Annotation on 4th series'],
      mapping: {
        'No annotation': undefined,
        'Annotation on 4th series': [
          {
            dataSeriesIndex: 3,
            dataPointIndex: 1,
            offset: 0.5,
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
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors`  defined in `PolarisVizProvider`',
    },
    emptyStateText: {
      description:
        'Used to indicate to screen readers that a chart with no series data has been rendered, in the case that an empty array is passed as the data. It is strongly recommended that this is included if the series prop could be an empty array.',
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
      description:
        'An object that defines the bars. Within the object, `isStacked` changes the grouping of the bars. If `true` the bar groups will stack vertically, otherwise they will render individual bars for each data point in each group. To see an example of stacked vs. grouped orientations, refer to the images above.',
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
    direction: DIRECTION_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    type: TYPE_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
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

const gradientSeries = data
  .map((serie, index) => ({
    ...serie,
    color: index % 2 === 0 ? barGradient1 : barGradient2,
  }))
  .filter((_, index) => index < 2);

export const Default: Story<BarChartProps> = Template.bind({});

Default.args = {
  data,
  xAxisOptions: {},
  isAnimated: true,
};

export const SingleBar: Story<BarChartProps> = Template.bind({});

SingleBar.args = {
  data: [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: 3},
        {key: 'Tuesday', value: -7},
        {key: 'Wednesday', value: 4},
        {key: 'Thursday', value: 8},
        {key: 'Friday', value: 50},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0.1},
      ],
    },
  ],
  xAxisOptions: {},
  isAnimated: true,
};

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
NoOverflowStyle.args = {
  data,
  xAxisOptions: {},
};

export const NoXAxis = Template.bind({});
NoXAxis.args = {
  data,
  xAxisOptions: {hide: true},
};

const WithoutRoundedCornersTemplate: Story<BarChartProps> = (
  args: BarChartProps,
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
      <BarChart {...args} />
    </PolarisVizProvider>
  );
};

export const WithoutRoundedCorners: Story<BarChartProps> = WithoutRoundedCornersTemplate.bind(
  {},
);
WithoutRoundedCorners.args = {
  data,
  xAxisOptions: {},
};

export const Stacked: Story<BarChartProps> = Template.bind({});
Stacked.args = {
  data,
  xAxisOptions: {},
  type: 'stacked',
};

export const OverwrittenSeriesColors: Story<BarChartProps> = Template.bind({});
OverwrittenSeriesColors.args = {
  data: gradientSeries,
  xAxisOptions: {},
  type: 'stacked',
};

export const IntegersOnly: Story<BarChartProps> = Template.bind({});
IntegersOnly.args = {
  data: [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: 2},
        {key: 'Tuesday', value: 0.1},
        {key: 'Wednesday', value: 0.78},
        {key: 'Thursday', value: 0.12},
        {key: 'Friday', value: 0.7},
        {key: 'Saturday', value: 0.3},
        {key: 'Sunday', value: 0.6},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {key: 'Monday', value: 0},
        {key: 'Tuesday', value: 0.1},
        {key: 'Wednesday', value: 0.12},
        {key: 'Thursday', value: 0.34},
        {key: 'Friday', value: 1.6},
        {key: 'Saturday', value: 0.21},
        {key: 'Sunday', value: 0.1},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {key: 'Monday', value: 1.23},
        {key: 'Tuesday', value: 1.42},
        {key: 'Wednesday', value: 2},
        {key: 'Thursday', value: 1.2},
        {key: 'Friday', value: 0.5},
        {key: 'Saturday', value: 0.12},
        {key: 'Sunday', value: 2},
      ],
    },
  ],
  xAxisOptions: {},
  yAxisOptions: {integersOnly: true},
};

export const LargeVolume: Story<BarChartProps> = Template.bind({});
LargeVolume.args = {
  data: [
    {
      name: 'Breakfast',
      data: Array(200)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Lunch',
      data: Array(200)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
    },
  ],
};

export const NegativeOnly = Template.bind({});
NegativeOnly.args = {
  data: [
    {
      name: 'Breakfast',
      data: (IntegersOnly.args.data as DataSeries[])[0].data.map(
        ({key, value}) => {
          return {key, value: value! * -1};
        },
      ),
    },
    {
      name: 'Lunch',
      data: (IntegersOnly.args.data as DataSeries[])[1].data.map(
        ({key, value}) => {
          return {key, value: value! * -1};
        },
      ),
    },
    {
      name: 'Dinner',
      data: (IntegersOnly.args.data as DataSeries[])[2].data.map(
        ({key, value}) => {
          return {key, value: value! * -1};
        },
      ),
    },
  ],
  isAnimated: true,
  xAxisOptions: {},
  yAxisOptions: {integersOnly: true},
};

export const SeriesColorsUpToFour = Template.bind({});

SeriesColorsUpToFour.args = {
  data: generateMultipleSeriesNewData(4),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  data: generateMultipleSeriesNewData(7),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  data: generateMultipleSeriesNewData(7),
};

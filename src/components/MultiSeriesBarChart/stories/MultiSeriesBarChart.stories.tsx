import React from 'react';
import {Story, Meta} from '@storybook/react';

import {
  MultiSeriesBarChart,
  MultiSeriesBarChartProps,
} from '../../../components';

import styles from './MultiSeriesBarChart.stories.scss';
import {DEFAULT_GREY_LABEL} from '../../../constants';
import {colorSky} from '@shopify/polaris-tokens';
import {SquareColorPreview} from '../../SquareColorPreview';

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
    color: 'primary',
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
    color: 'secondary',
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
    color: 'tertiary',
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
        'The `Series` type gives the user a lot of flexibility to define exactly what each bar group should look like. [Series type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/MultiSeriesBarChart/types.ts#L11)',
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
      description:
        'An object that defines the appearance of the bars. [BarOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/MultiSeriesBarChart/types.ts#L44)',
    },
    xAxisOptions: {
      description:
        'An object that defines the appearance of the xAxis and its labels. [XAxisOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/MultiSeriesBarChart/types.ts#L62)',
    },
    yAxisOptions: {
      description:
        'An object that defines the appearance of the yAxis and its labels. [YAxisOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/MultiSeriesBarChart/types.ts#L69)',
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
    gridOptions: {
      description:
        'An object that defines the appearance of the grid. [GridOptions type definition.]()',
    },
  },
} as Meta;

const Template: Story<MultiSeriesBarChartProps> = (
  args: MultiSeriesBarChartProps,
) => {
  return <MultiSeriesBarChart {...args} />;
};

const defaultProps = {
  series,
  xAxisOptions: {
    labels,
    labelFormatter: (value: string) => value,
    showTicks: true,
    labelColor: DEFAULT_GREY_LABEL,
  },
  barOptions: {
    hasRoundedCorners: false,
    isStacked: false,
    zeroAsMinHeight: false,
    innerMargin: 'Medium',
    outerMargin: 'None',
  },
  gridOptions: {
    showHorizontalLines: true,
    color: colorSky,
    horizontalOverflow: false,
    horizontalMargin: 0,
  },
  isAnimated: true,
  yAxisOptions: {
    labelFormatter: (value: number) => value.toString(),
    labelColor: DEFAULT_GREY_LABEL,
    backgroundColor: 'transparent',
    integersOnly: false,
  },
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

export const InsightsStyle = Template.bind({});
InsightsStyle.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
InsightsStyle.args = {
  series: gradientSeries,
  xAxisOptions: {labels, showTicks: false, labelColor: 'rgb(220, 220, 220)'},
  barOptions: {
    hasRoundedCorners: true,
  },
  yAxisOptions: {
    backgroundColor: '#333333',
    labelColor: 'rgb(220, 220, 220)',
  },
  gridOptions: {
    showVerticalLines: false,
    color: 'rgb(99, 115, 129)',
    horizontalOverflow: true,
    horizontalMargin: 20,
  },
  crossHairOptions: {
    width: 1,
    color: 'rgb(139, 159, 176)',
  },
  isAnimated: true,
};

export const OverflowStyles = Template.bind({});
OverflowStyles.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    hasRoundedCorners: true,
  },
  yAxisOptions: {backgroundColor: 'white'},
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 30,
    showVerticalLines: false,
  },
};

export const WithoutRoundedCorners = Template.bind({});
WithoutRoundedCorners.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    hasRoundedCorners: false,
  },
  yAxisOptions: {backgroundColor: 'white'},
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 30,
    showVerticalLines: false,
  },
};

export const Stacked = Template.bind({});
Stacked.args = {
  series: series,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const StackedGradient = Template.bind({});
StackedGradient.args = {
  series: gradientSeries,
  xAxisOptions: {labels},
  barOptions: {
    isStacked: true,
  },
};

export const IntegersOnly = Template.bind({});
IntegersOnly.args = {
  series: [
    {
      name: 'Breakfast',
      color: 'primary',
      data: [
        {label: 'Monday', rawValue: 0.3},
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
      color: 'secondary',
      data: [
        {label: 'Monday', rawValue: 0},
        {label: 'Tuesday', rawValue: 0.1},
        {label: 'Wednesday', rawValue: 0.12},
        {label: 'Thursday', rawValue: 0.34},
        {label: 'Friday', rawValue: 0.54},
        {label: 'Saturday', rawValue: 0.21},
        {label: 'Sunday', rawValue: 0.1},
      ],
    },
    {
      name: 'Dinner',
      color: 'tertiary',
      data: [
        {label: 'Monday', rawValue: 1.23},
        {label: 'Tuesday', rawValue: 1.42},
        {label: 'Wednesday', rawValue: 2},
        {label: 'Thursday', rawValue: 1.2},
        {label: 'Friday', rawValue: 0.5},
        {label: 'Saturday', rawValue: 0.12},
        {label: 'Sunday', rawValue: 0.6},
      ],
    },
  ],
  xAxisOptions: {labels},
  yAxisOptions: {integersOnly: true},
};

export const LargeVolume = Template.bind({});
LargeVolume.args = {
  series: [
    {
      name: 'Breakfast',
      color: 'primary',
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
      color: 'secondary',
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

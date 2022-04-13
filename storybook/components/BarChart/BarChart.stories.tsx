import React from 'react';
import type {Story, Meta} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {BarChart, BarChartProps} from '@shopify/polaris-viz';

import {
  SquareColorPreview,
  PolarisVizProvider,
} from '../../../packages/polaris-viz/src/components';
import {
  DATA_SERIES_ARGS,
  DIRECTION_CONTROL_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  LEGEND_CONTROL_ARGS,
  SKIP_LINK_TEXT_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../constants';
import {PageWithSizingInfo} from '../Docs/stories/components/PageWithSizingInfo';
import {generateMultipleSeries} from '../../utilities/generate-data';

import {DATA, DATA_WITH_COLOR} from './data';

const TOOLTIP_CONTENT = {
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
        {data.map(({label, value, color}, index) => (
          <div
            key={index}
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

export default {
  title: 'polaris-viz/Default Charts/BarChart',
  component: BarChart,
  parameters: {
    horizontalMargin: 0,
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side.',
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
            color: 'lime',
            ariaLabel: 'Median: 1.5',
            tooltipData: {
              label: 'Median',
              value: '1.5 hours',
            },
          },
        ],
      },
    },
    data: DATA_SERIES_ARGS,
    emptyStateText: EMPTY_STATE_TEXT_ARGS,
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences. Note: animations are currently only available for the non-stacked bar chart.',
    },
    skipLinkText: SKIP_LINK_TEXT_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    renderTooltipContent: {
      options: Object.keys(TOOLTIP_CONTENT),
      mapping: TOOLTIP_CONTENT,
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
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

export const Default: Story<BarChartProps> = Template.bind({});

Default.args = {
  data: DATA,
  isAnimated: true,
  showLegend: true,
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

  isAnimated: true,
};

export const Horizontal: Story<BarChartProps> = Template.bind({});

Horizontal.args = {
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
  isAnimated: true,
  direction: 'horizontal',
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
  data: DATA,
};

export const HideXAxisLabels = Template.bind({});
HideXAxisLabels.args = {
  data: DATA,
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

export const WithoutRoundedCorners: Story<BarChartProps> =
  WithoutRoundedCornersTemplate.bind({});
WithoutRoundedCorners.args = {
  data: DATA,
};

export const Stacked: Story<BarChartProps> = Template.bind({});
Stacked.args = {
  data: DATA,

  type: 'stacked',
  isAnimated: true,
};

export const OverwrittenSeriesColors: Story<BarChartProps> = Template.bind({});
OverwrittenSeriesColors.args = {
  data: DATA_WITH_COLOR,

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

  yAxisOptions: {integersOnly: true},
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

  yAxisOptions: {integersOnly: true},
};

export const SeriesColorsUpToFour = Template.bind({});

SeriesColorsUpToFour.args = {
  data: generateMultipleSeries(4),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  data: generateMultipleSeries(7),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  data: generateMultipleSeries(7),
};

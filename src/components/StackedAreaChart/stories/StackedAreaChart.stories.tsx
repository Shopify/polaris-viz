import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';

import {data, labels, formatYAxisLabel} from './utils.stories';
import {LEGEND_CONTROL_ARGS, THEME_CONTROL_ARGS} from '../../../storybook';

import {generateMultipleSeries} from '../../../../documentation/utilities';
import type {RenderTooltipContentData} from '../types';

const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: RenderTooltipContentData) => (
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
      {data.map((x) => (
        <div>{`${x.label}: ${x.value}`}</div>
      ))}
    </div>
  ),
};

export default {
  title: 'Default Charts/StackedAreaChart',
  component: StackedAreaChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives. <br /> This component inherits its height and width from its container. <br /> <br /> This component inherits its height and width from its container.',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    xAxisOptions: {
      description:
        'The labels to display on the x axis of the chart, label formatter and other configuration of its appearance.',
    },
    isAnimated: {
      description:
        'Whether to animate the chart when it is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    yAxisOptions: {
      description:
        'An object containing the `formatYAxisLabel` function, which formats the values displayed on the yAxis and in the tooltip. [NumberLabelFormatter type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/types.ts#L114)',
    },
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
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to the tooltip. [TooltipData type definition.]()',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    theme: THEME_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const defaultProps = {
  data,
  skipLinkText: 'Skip chart content',
  xAxisOptions: {xAxisLabels: labels},
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  isAnimated: true,
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};
export const Default: Story<StackedAreaChartProps> = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const HideXAxisLabels: Story<StackedAreaChartProps> = Template.bind({});
HideXAxisLabels.args = {
  ...defaultProps,
  xAxisOptions: {...defaultProps.xAxisOptions, hide: true},
};

export const OverwrittenSeriesColors: Story<StackedAreaChartProps> = Template.bind(
  {},
);
OverwrittenSeriesColors.args = {
  ...defaultProps,
  xAxisOptions: {
    xAxisLabels: Array(5)
      .fill(null)
      .map(() => 'label'),
  },
  data: [
    {
      name: 'One',
      data: Array(5)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
      color: 'lime',
    },
    {
      name: 'Two',
      data: Array(5)
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

export const SeriesColorsUpToFour = Template.bind({});

SeriesColorsUpToFour.args = {
  ...defaultProps,
  data: generateMultipleSeries(4),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  ...defaultProps,
  data: generateMultipleSeries(7),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  ...defaultProps,
  data: generateMultipleSeries(14),
};

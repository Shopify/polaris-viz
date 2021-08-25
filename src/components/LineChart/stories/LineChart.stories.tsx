import React from 'react';
import {Story, Meta} from '@storybook/react';

import {LineChart, LineChartProps} from '../LineChart';
import styles from './LineChart.stories.scss';
import {
  series,
  xAxisLabels,
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
  gradient,
  seriesUsingSeriesColors,
} from './utils.stories';
import {colorTeal} from '../../../constants';

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
      {data.map((x) => (
        <div>{`${formatXAxisLabel(x.point.label)}: ${x.point.value}`}</div>
      ))}
    </div>
  ),
};

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component:
          'Used to show change over time, comparisons, and trends. <br /> This component inherits its height and width from its container.',
      },
    },
  },
  argTypes: {
    theme: {
      description: 'The theme that the chart will inherit its styles from',
    },
    series: {
      description:
        'The `Series` type gives the user the flexibility to define exactly what each series/line should look like, as well as providing the data to be plotted.',
    },
    xAxisOptions: {
      description:
        'Configures the xAxis and provides the labels that should be used.',
    },
    emptyStateText: {
      description:
        'Used to indicate to screenreaders that a chart with no data has been rendered, in the case that an empty array is passed as the series data. It is strongly recommended that this is included if the series prop could be an empty array.',
    },
    isAnimated: {
      description:
        'Whether to animate the lines and gradient when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
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
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<LineChartTooltipContent />`. [TooltipData type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L20)',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    yAxisOptions: {
      description:
        'An object of optional proprties that define the appearance of the yAxis.',
    },
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const InsightsStyle = Template.bind({});
InsightsStyle.args = {
  series,
  theme: 'Default',
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
  },
  renderTooltipContent,
  isAnimated: true,
};

export const SeriesColors = Template.bind({});
SeriesColors.args = {
  series: seriesUsingSeriesColors,
  theme: 'Default',
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
  },
  renderTooltipContent,
  isAnimated: true,
};

export const HideXAxisLabels = Template.bind({});
HideXAxisLabels.args = {
  theme: 'NoxAxisLabels',
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const NoOverflowStyle = Template.bind({});
NoOverflowStyle.args = {
  theme: 'NoOverflow',
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const IntegersOnly = Template.bind({});
IntegersOnly.args = {
  theme: 'Default',
  series: [
    {
      name: 'Integers Only',
      data: [
        {rawValue: 0.1, label: '2020-04-01T12:00:00'},
        {rawValue: 0.4, label: '2020-04-02T12:00:00'},
        {rawValue: 0.6, label: '2020-04-03T12:00:00'},
        {rawValue: 0.2, label: '2020-04-04T12:00:00'},
        {rawValue: 0.5, label: '2020-04-05T12:00:00'},
        {rawValue: 0.9, label: '2020-04-06T12:00:00'},
        {rawValue: 0.5, label: '2020-04-07T12:00:00'},
      ],
    },
  ],
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {integersOnly: true},
  renderTooltipContent,
};

export const NoArea = Template.bind({});
NoArea.args = {
  theme: 'Default',
  series: [
    {
      name: 'Sales',
      data: [
        {rawValue: 100, label: '2020-04-01T12:00:00'},
        {rawValue: 99, label: '2020-04-02T12:00:00'},
        {rawValue: 1000, label: '2020-04-03T12:00:00'},
        {rawValue: 2, label: '2020-04-04T12:00:00'},
        {rawValue: 22, label: '2020-04-05T12:00:00'},
        {rawValue: 6, label: '2020-04-06T12:00:00'},
        {rawValue: 5, label: '2020-04-07T12:00:00'},
      ],
      color: gradient,
      area: null,
    },
  ],
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  renderTooltipContent,
};

export const SolidColor = Template.bind({});
SolidColor.args = {
  theme: 'Default',
  series: [
    {
      name: 'Sales',
      data: [
        {rawValue: 100, label: '2020-04-01T12:00:00'},
        {rawValue: 99, label: '2020-04-02T12:00:00'},
        {rawValue: 1000, label: '2020-04-03T12:00:00'},
        {rawValue: 2, label: '2020-04-04T12:00:00'},
        {rawValue: 22, label: '2020-04-05T12:00:00'},
        {rawValue: 6, label: '2020-04-06T12:00:00'},
        {rawValue: 5, label: '2020-04-07T12:00:00'},
      ],
      color: colorTeal,
    },
  ],
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
  },
  renderTooltipContent,
};

export const LargeDataSet = Template.bind({});

LargeDataSet.args = {
  theme: 'Default',
  series: [
    {
      name: 'series 1',
      data: Array(3000)
        .fill(null)
        .map((x) => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: 'Some value',
          };
        }),
    },
    {
      name: 'series 2',
      data: Array(3000)
        .fill(null)
        .map((x) => {
          return {
            rawValue: Math.random() * Math.random() * 100,
            label: 'Some value',
          };
        }),
    },
  ],
  xAxisOptions: {
    xAxisLabels: Array(3000)
      .fill(null)
      .map((x) => {
        return 'Some value';
      }),
  },
  renderTooltipContent,
};

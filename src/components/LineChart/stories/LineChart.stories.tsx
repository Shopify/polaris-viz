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
    series: {
      description:
        'The `Series` type gives the user the flexibility to define exactly what each series/line should look like, as well as providing the data to be plotted. [Series type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L10)',
    },
    xAxisOptions: {
      description:
        'Configures the appearance of the xAxis and provides the labels that should be used. [XAxisOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L40)',
    },
    crossHairOptions: {
      description:
        'An object including the following optional proprties that define the crosshair. [CrossHairOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L64)',
    },
    emptyStateText: {
      description:
        'Used to indicate to screenreaders that a chart with no data has been rendered, in the case that an empty array is passed as the series data. It is strongly recommended that this is included if the series prop could be an empty array.',
    },
    gridOptions: {
      description:
        'An object including the following optional proprties that define the grid. [GridOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L56)',
    },
    isAnimated: {
      description:
        'Whether to animate the lines and gradient when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    lineOptions: {
      description:
        'An object including the following optional proprties that define the appearance of the line. [LineOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L34)',
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
        'An object of optional proprties that define the appearance of the yAxis. [YAxisOptions type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/LineChart/types.ts#L49)',
    },
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const Default = Template.bind({});
Default.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
Default.args = {
  series: series.slice(0, 4),
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    useMinimalLabels: true,
    showTicks: false,
  },
  lineOptions: {
    hasSpline: true,
    pointStroke: '#333333',
  },
  gridOptions: {
    showVerticalLines: false,
    color: 'rgb(99, 115, 129)',
    horizontalOverflow: true,
    horizontalMargin: 20,
  },
  crossHairOptions: {
    width: 1,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
  },
  renderTooltipContent,
  isAnimated: true,
};

export const ManySeries = Template.bind({});
ManySeries.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
ManySeries.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    useMinimalLabels: true,
    showTicks: false,
  },
  lineOptions: {
    hasSpline: true,
    pointStroke: '#333333',
  },
  gridOptions: {
    showVerticalLines: false,
    color: 'rgb(99, 115, 129)',
    horizontalOverflow: true,
    horizontalMargin: 20,
  },
  crossHairOptions: {
    width: 1,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
  },
  renderTooltipContent,
  isAnimated: true,
};
export const HideXAxisLabels = Template.bind({});
HideXAxisLabels.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    hideXAxisLabels: true,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const OverflowStyle = Template.bind({});
OverflowStyle.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    showTicks: false,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel, backgroundColor: 'white'},
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 20,
    showVerticalLines: false,
  },
  lineOptions: {hasSpline: true},
  renderTooltipContent,
};

export const curvedLines = Template.bind({});
curvedLines.args = {
  series,
  xAxisOptions: {
    xAxisLabels,
    labelFormatter: formatXAxisLabel,
    showTicks: false,
    hideXAxisLabels: true,
  },
  yAxisOptions: {
    labelFormatter: formatYAxisLabel,
    backgroundColor: 'white',
  },
  gridOptions: {
    horizontalOverflow: true,
    horizontalMargin: 20,
    showVerticalLines: false,
  },
  isAnimated: true,
  lineOptions: {hasSpline: true},
  renderTooltipContent,
};

export const IntegersOnly = Template.bind({});
IntegersOnly.args = {
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

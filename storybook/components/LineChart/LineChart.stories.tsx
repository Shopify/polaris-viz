import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {LineChart, LineChartProps} from '@shopify/polaris-viz';

import {
  DATA_SERIES_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  LEGEND_CONTROL_ARGS,
  SKIP_LINK_TEXT_ARGS,
  THEME_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../constants';
import {generateMultipleSeries} from '../../utilities/generate-data';

import {
  formatXAxisLabel,
  formatYAxisLabel,
  renderTooltipContent,
} from './utilities';
import {DATA} from './data';
import {PageWithSizingInfo} from '../Docs/stories/components/PageWithSizingInfo';

const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: {data: any}) => (
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
      {data.map((x: any, index) => (
        <div key={index}>{`${formatXAxisLabel(x.point.label)}: ${
          x.point.value
        }`}</div>
      ))}
    </div>
  ),
};

export default {
  title: 'polaris-viz/Default Charts/LineChart',
  component: LineChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show change over time, comparisons, and trends.',
      },
    },
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    emptyStateText: EMPTY_STATE_TEXT_ARGS,
    isAnimated: {
      description:
        'Whether to animate the lines and gradient when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
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
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to `<LineChartTooltipContent />`. The distinction between the `RenderTooltipContentData` and `Series` types is that `RenderTooltipContentData` is for a single data point, instead of an entire series of data.',
    },
    skipLinkText: SKIP_LINK_TEXT_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    theme: THEME_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const Default: Story<LineChartProps> = Template.bind({});
Default.args = {
  data: DATA,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  showLegend: true,
};

export const HideXAxisLabels: Story<LineChartProps> = Template.bind({});
HideXAxisLabels.args = {
  data: DATA,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
    hide: true,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const NoOverflowStyle: Story<LineChartProps> = Template.bind({});
NoOverflowStyle.args = {
  theme: 'NoOverflow',
  data: DATA,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  renderTooltipContent,
};

export const IntegersOnly: Story<LineChartProps> = Template.bind({});
IntegersOnly.args = {
  data: [
    {
      name: 'Integers Only',
      data: [
        {value: 0.1, key: '2020-04-01T12:00:00'},
        {value: 0.4, key: '2020-04-02T12:00:00'},
        {value: 0.6, key: '2020-04-03T12:00:00'},
        {value: 0.2, key: '2020-04-04T12:00:00'},
        {value: 0.5, key: '2020-04-05T12:00:00'},
        {value: 0.9, key: '2020-04-06T12:00:00'},
        {value: 0.5, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {integersOnly: true},
  renderTooltipContent,
};

export const NoArea: Story<LineChartProps> = Template.bind({});
NoArea.args = {
  data: [
    {
      name: 'Sales',
      data: [
        {value: 100, key: '2020-04-01T12:00:00'},
        {value: 99, key: '2020-04-02T12:00:00'},
        {value: 1000, key: '2020-04-03T12:00:00'},
        {value: 2, key: '2020-04-04T12:00:00'},
        {value: 22, key: '2020-04-05T12:00:00'},
        {value: 6, key: '2020-04-06T12:00:00'},
        {value: 5, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  renderTooltipContent,
};

export const OverwrittenSeriesColors: Story<LineChartProps> = Template.bind({});
OverwrittenSeriesColors.args = {
  data: [
    {
      name: 'Sales',
      data: [
        {value: 100, key: '2020-04-01T12:00:00'},
        {value: 99, key: '2020-04-02T12:00:00'},
        {value: 1000, key: '2020-04-03T12:00:00'},
        {value: 2, key: '2020-04-04T12:00:00'},
        {value: 22, key: '2020-04-05T12:00:00'},
        {value: 6, key: '2020-04-06T12:00:00'},
        {value: 5, key: '2020-04-07T12:00:00'},
      ],
      color: 'lime',
    },
  ],
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  renderTooltipContent,
};

export const SeriesColorsUpToFour: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToFour.args = {
  data: generateMultipleSeries(4),
  renderTooltipContent,
  isAnimated: true,
};

export const SeriesColorsFromFiveToSeven: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsFromFiveToSeven.args = {
  data: generateMultipleSeries(7),
  renderTooltipContent,
};

export const SeriesColorsUpToFourteen: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsUpToFourteen.args = {
  data: generateMultipleSeries(14),
  renderTooltipContent,
};

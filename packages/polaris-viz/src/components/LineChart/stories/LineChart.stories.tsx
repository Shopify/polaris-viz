import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {LineChart, LineChartProps} from '../LineChart';
import styles from './LineChart.stories.scss';
import {data, formatXAxisLabel, formatYAxisLabel} from './utils.stories';
import {
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
} from '../../../storybook';

import {generateMultipleSeries} from '../../Docs/utilities';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';
import type {RenderTooltipContentData} from '../../../types';

const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: RenderTooltipContentData) => {
    return (
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
        {data[0].data.map(({key, value}) => (
          <div>{`${key}: ${formatYAxisLabel(value!)}`}</div>
        ))}
      </div>
    );
  },
};

export default {
  title: 'polaris-viz/Default Charts/LineChart',
  component: LineChart,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show change over time, comparisons, and trends.',
      },
      yScale: {
        controls: null,
      },
      xScale: {
        controls: null,
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
        'Configures the xAxis and provides the labels that should be used.',
    },
    emptyStateText: {
      description:
        'Used to indicate to screen readers that a chart with no data has been rendered, in the case that an empty array is passed as the series data. It is strongly recommended that this is included if the series prop could be an empty array.',
    },
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
      description: RENDER_TOOLTIP_DESCRIPTION,
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    yAxisOptions: {
      description:
        'An object of optional properties that define the appearance of the yAxis.',
    },
    theme: THEME_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

export const Default: Story<LineChartProps> = Template.bind({});
Default.args = {
  data,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  showLegend: true,
};

export const HideXAxisLabels: Story<LineChartProps> = Template.bind({});
HideXAxisLabels.args = {
  data,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
    hide: true,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
};

export const NoOverflowStyle: Story<LineChartProps> = Template.bind({});
NoOverflowStyle.args = {
  theme: 'NoOverflow',
  data,
  xAxisOptions: {
    labelFormatter: formatXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatYAxisLabel},
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
};

export const SeriesColorsUpToFour: Story<LineChartProps> = Template.bind({});

SeriesColorsUpToFour.args = {
  data: generateMultipleSeries(4),
  isAnimated: true,
};

export const SeriesColorsFromFiveToSeven: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsFromFiveToSeven.args = {
  data: generateMultipleSeries(7),
};

export const SeriesColorsUpToFourteen: Story<LineChartProps> = Template.bind(
  {},
);

SeriesColorsUpToFourteen.args = {
  data: generateMultipleSeries(14),
};

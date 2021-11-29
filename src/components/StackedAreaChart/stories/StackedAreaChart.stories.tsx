import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';

import {data, labels, formatYAxisLabel} from './utils.stories';
import {THEME_CONTROL_ARGS} from '../../../storybook';

import {generateMultipleSeries} from '../../../../documentation/utilities';
import type {RenderTooltipContentData} from '../types';

const tooltipContent = {
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
  title: 'Charts/StackedAreaChart',
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
        'The `Series` type gives the user flexibility to define what each series/area should look like, as well as providing the data to be plotted. [Series type definition.](https://github.com/Shopify/polaris-viz/blob/master/src/components/StackedAreaChart/types.ts#L3)',
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
        'This accepts a function that is called to render the tooltip content. By default it calls `formatXAxisLabel` and `formatYAxisLabel` to format the the tooltip values and passes them to the tooltip. [TooltipData type definition.]()',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    theme: THEME_CONTROL_ARGS,
  },
} as Meta;

const defaultProps = {
  data,
  skipLinkText: 'Skip chart content',
  xAxisOptions: {labels},
  yAxisOptions: {formatLabel: formatYAxisLabel},
  isAnimated: true,
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return <StackedAreaChart {...args} />;
};
export const Default: Story<StackedAreaChartProps> = Template.bind({});
Default.args = defaultProps;

export const HideXAxis: Story<StackedAreaChartProps> = Template.bind({});
HideXAxis.args = {
  ...defaultProps,
  xAxisOptions: {...defaultProps.xAxisOptions, hide: true},
};

export const Gradients: Story<StackedAreaChartProps> = Template.bind({});
Gradients.args = {
  ...defaultProps,
  xAxisOptions: {
    labels: Array(5)
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
      color: [
        {offset: 0, color: 'rgba(58, 164, 246, 0.8)'},
        {offset: 60, color: 'rgba(152, 107, 255, 0.8)'},
        {offset: 100, color: 'rgba(236, 110, 110, 0.8)'},
      ],
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

export const LargeVolume: Story<StackedAreaChartProps> = Template.bind({});
LargeVolume.args = {
  ...defaultProps,
  xAxisOptions: {
    labels: Array(2000)
      .fill(null)
      .map(() => 'label'),
  },
  data: [
    {
      name: 'First-time',
      data: Array(2000)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
    },
    {
      name: 'Returning',
      data: Array(2000)
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

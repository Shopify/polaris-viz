import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {StackedAreaChart, StackedAreaChartProps} from '../StackedAreaChart';

import {data, formatYAxisLabel} from './utils.stories';
import {
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
  CHART_STATE_CONTROL_ARGS,
  ANNOTATIONS_ARGS,
} from '../../../storybook';

import {generateMultipleSeries} from '../../Docs/utilities';
import type {Annotation, RenderTooltipContentData} from '../../../types';

import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';

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
          <div>{`${key}: ${value}`}</div>
        ))}
      </div>
    );
  },
};

export default {
  title: 'polaris-viz/Charts/StackedAreaChart',
  component: StackedAreaChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to compare multiple series of data and display the total value. This chart is not ideal for displaying datasets with negatives. <br /> ',
      },
    },
  },
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    annotations: ANNOTATIONS_ARGS,
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
        'An object containing the `formatYAxisLabel` function, which formats the values displayed on the yAxis and in the tooltip. [NumberLabelFormatter type definition.](https://github.com/Shopify/polaris-viz/blob/main/src/types.ts#L114)',
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
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const DEFAULT_PROPS = {
  data,
  skipLinkText: 'Skip chart content',
  yAxisOptions: {labelFormatter: formatYAxisLabel},
  isAnimated: true,
};

const Template: Story<StackedAreaChartProps> = (
  args: StackedAreaChartProps,
) => {
  return (
    <div style={{height: '500px'}}>
      <StackedAreaChart {...args} />
    </div>
  );
};
export const Default: Story<StackedAreaChartProps> = Template.bind({});
Default.args = DEFAULT_PROPS;

export const HideXAxisLabels: Story<StackedAreaChartProps> = Template.bind({});
HideXAxisLabels.args = {
  ...DEFAULT_PROPS,
  xAxisOptions: {hide: true},
};

export const OverwrittenSeriesColors: Story<StackedAreaChartProps> =
  Template.bind({});
OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
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
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(4, 'dates'),
};

export const SeriesColorsFromFiveToSeven = Template.bind({});

SeriesColorsFromFiveToSeven.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(7, 'dates'),
};

export const SeriesColorsUpToFourteen = Template.bind({});

SeriesColorsUpToFourteen.args = {
  ...DEFAULT_PROPS,
  data: generateMultipleSeries(14, 'dates'),
};

const ANNOTATIONS: Annotation[] = [
  {
    startKey: 'February',
    label: 'Sales increase',
    axis: 'x',
  },
  {
    startKey: 'May',
    label: 'Super Big Sale',
    content: {
      content: 'We ran a massive sale on our products. We made a lot of money!',
    },
    axis: 'x',
  },
  {
    startKey: '13000',
    label: 'Sales target',
    axis: 'y',
  },
  {
    startKey: '7500',
    label: 'Break-even',
    axis: 'y',
    content: {
      content: 'This is our break-even point. We can sell for $10 per unit.',
    },
  },
];

export const Annotations: Story<StackedAreaChartProps> = Template.bind({});

Annotations.args = {
  ...DEFAULT_PROPS,
  annotations: ANNOTATIONS,
};

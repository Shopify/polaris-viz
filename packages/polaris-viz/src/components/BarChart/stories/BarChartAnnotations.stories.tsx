import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {BarChart, BarChartProps} from '../../../components';
import type {Annotation} from '../../../types';

import {
  DIRECTION_CONTROL_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  CHART_STATE_CONTROL_ARGS,
  ANNOTATIONS_ARGS,
} from '../../../storybook';

import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo';
import {DATA, TOOLTIP_CONTENT} from './utilities';

export default {
  title: 'polaris-viz/Charts/BarChart/Annotations',
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
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    annotations: ANNOTATIONS_ARGS,
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    emptyStateText: {
      description:
        'Used to indicate to screen readers that a chart with no series data has been rendered, in the case that an empty array is passed as the data. If the series prop could be an empty array, it is strongly recommended to include this prop.',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences. Note: animations are currently only available for the non-stacked bar chart.',
    },
    skipLinkText: {
      description:
        'If provided, renders a `<SkipLink/>` button with the string. Use this for charts with large data sets, so keyboard users can skip all the tabbable data points in the chart.',
    },
    xAxisOptions: {
      description: 'An object that defines the xAxis and its options.',
    },
    yAxisOptions: {
      description: 'An object that defines the yAxis and its options.',
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
    direction: DIRECTION_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    type: TYPE_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
} as Meta;

const Template: Story<BarChartProps> = (args: BarChartProps) => {
  return <BarChart {...args} />;
};

const VERTICAL_ANNOTATIONS: Annotation[] = [
  {
    startKey: 'Friday',
    label: 'Big Sale',
    axis: 'x',
  },
  {
    startKey: 'Wednesday',
    label: 'GDPR rule change',
    content: {
      title: 'GDPR rule change',
      content:
        'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
      linkUrl: 'https://shopify.com',
    },
    axis: 'x',
  },
  {
    startKey: '30',
    label: 'Sales target',
    axis: 'y',
  },
  {
    startKey: '10',
    label: 'Break-even',
    axis: 'y',
    content: {
      content: 'This is our break-even point. We can sell for $10 per unit.',
    },
  },
];

const HORIZONTAL_ANNOTATIONS: Annotation[] = [
  {
    startKey: 'Friday',
    label: 'Big Sale',
    axis: 'y',
  },
  {
    startKey: 'Wednesday',
    label: 'GDPR rule change',
    content: {
      title: 'GDPR rule change',
      content:
        'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
      linkUrl: 'https://shopify.com',
    },
    axis: 'y',
  },
  {
    startKey: '30',
    label: 'Sales target',
    axis: 'x',
  },
  {
    startKey: '10',
    label: 'Break-even',
    axis: 'x',
    content: {
      content: 'This is our break-even point. We can sell for $10 per unit.',
    },
  },
];

export const VerticalBarChart: Story<BarChartProps> = Template.bind({});

VerticalBarChart.args = {
  data: DATA,
  xAxisOptions: {},
  isAnimated: true,
  showLegend: true,
  annotations: VERTICAL_ANNOTATIONS,
};

export const HorizontalBarChart: Story<BarChartProps> = Template.bind({});

HorizontalBarChart.args = {
  data: DATA,
  xAxisOptions: {},
  isAnimated: true,
  showLegend: true,
  annotations: HORIZONTAL_ANNOTATIONS,
  direction: 'horizontal',
};

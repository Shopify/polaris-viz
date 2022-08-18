import React from 'react';
import type {Meta} from '@storybook/react';

import {BarChart} from '../../../components';
import {
  DIRECTION_CONTROL_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  CHART_STATE_CONTROL_ARGS,
  ANNOTATIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';

import {TOOLTIP_CONTENT} from './data';

export const META: Meta = {
  title: 'polaris-viz/Charts/BarChart',
  component: BarChart,
  parameters: {
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
};

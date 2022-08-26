import type {Meta} from '@storybook/react';
import React from 'react';

import {
  ANNOTATIONS_ARGS,
  CHART_STATE_CONTROL_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {LineChart} from '../LineChart';

import {TOOLTIP_CONTENT} from './data';

export const META: Meta = {
  title: 'polaris-viz/Charts/LineChart',
  component: LineChart,
  decorators: [(Story: any) => <div style={{height: 400}}>{Story()}</div>],
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
    annotations: ANNOTATIONS_ARGS,
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
        'Used to indicate to screen readers that a chart with no data has been rendered, in the case that an empty array is passed as the series data. If the series prop could be an empty array, it is strongly recommended to include this prop.',
    },
    isAnimated: {
      description:
        'Whether to animate the lines and gradient when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    renderTooltipContent: {
      options: Object.keys(TOOLTIP_CONTENT),
      mapping: TOOLTIP_CONTENT,
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
    state: CHART_STATE_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
};

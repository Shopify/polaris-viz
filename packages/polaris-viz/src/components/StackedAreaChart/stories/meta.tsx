import React from 'react';
import type {Meta} from '@storybook/react';

import {
  ANNOTATIONS_ARGS,
  CHART_STATE_CONTROL_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {StackedAreaChart} from '../StackedAreaChart';

import {TOOLTIP_CONTENT} from './data';

export const META: Meta = {
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
};

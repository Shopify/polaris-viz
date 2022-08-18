import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {SimpleBarChart} from '../SimpleBarChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SimpleBarChart',
  component: SimpleBarChart,
  parameters: {
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used to show comparison of different types, across categories or time. Bars can be stacked or side by side.  ',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    isAnimated: {
      description:
        'Whether to animate the bars when the chart is initially rendered and its data is updated. Even if `isAnimated` is set to true, animations will not be displayed for users with reduced motion preferences.',
    },
    type: TYPE_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: {
      description:
        'An object used to configure the labels displayed beside the bars.',
    },
  },
};

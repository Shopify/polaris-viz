import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  IS_ANIMATED_ARGS,
  LEGEND_POSITION_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo/PageWithSizingInfo';
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
    controls: CONTROLS_ARGS,
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    isAnimated: IS_ANIMATED_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    legendPosition: LEGEND_POSITION_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    type: TYPE_CONTROL_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
  },
};

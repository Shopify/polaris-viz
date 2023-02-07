import type {Meta} from '@storybook/react';

import {BarChart} from '../../../components';
import {
  ANNOTATIONS_ARGS,
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  DIRECTION_CONTROL_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  IS_ANIMATED_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  SKIP_LINK_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
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
    controls: CONTROLS_ARGS,
  },
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    annotations: ANNOTATIONS_ARGS,
    data: DATA_SERIES_ARGS,
    emptyStateText: EMPTY_STATE_TEXT_ARGS,
    isAnimated: IS_ANIMATED_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    skipLinkText: SKIP_LINK_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
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

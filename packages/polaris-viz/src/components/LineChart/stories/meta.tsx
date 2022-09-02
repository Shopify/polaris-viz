import type {Meta} from '@storybook/react';
import React from 'react';

import {
  ANNOTATIONS_ARGS,
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  IS_ANIMATED_ARGS,
  LEGEND_CONTROL_ARGS,
  RENDER_TOOLTIP_DESCRIPTION,
  SKIP_LINK_ARGS,
  THEME_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {LineChart} from '../LineChart';

import {TOOLTIP_CONTENT} from './data';

export const META: Meta = {
  title: 'polaris-viz/Charts/LineChart',
  component: LineChart,
  decorators: [(Story: any) => <div style={{height: 400}}>{Story()}</div>],
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show change over time, comparisons, and trends.',
      },
    },
  },
  argTypes: {
    annotations: ANNOTATIONS_ARGS,
    data: DATA_SERIES_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    emptyStateText: EMPTY_STATE_TEXT_ARGS,
    isAnimated: IS_ANIMATED_ARGS,
    renderTooltipContent: {
      options: Object.keys(TOOLTIP_CONTENT),
      mapping: TOOLTIP_CONTENT,
      description: RENDER_TOOLTIP_DESCRIPTION,
    },
    skipLinkText: SKIP_LINK_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    showLegend: LEGEND_CONTROL_ARGS,
  },
};

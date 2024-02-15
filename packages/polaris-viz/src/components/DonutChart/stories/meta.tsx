import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  LEGEND_FULL_WIDTH_ARGS,
  LEGEND_POSITION_ARGS,
  RENDER_HIDDEN_LEGEND_LABEL_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  SHOW_LEGEND_ARGS,
  SHOW_LEGEND_VALUES_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import type {DonutChartProps} from '../DonutChart';
import {DonutChart} from '../DonutChart';

export const META: Meta<DonutChartProps> = {
  title: 'polaris-viz/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    a11y: {disable: true},
    controls: CONTROLS_ARGS,
    docs: {
      description: {
        component:
          'Circular statistical graphic, which is divided into slices to illustrate numerical proportion.',
      },
    },
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    legendFullWidth: LEGEND_FULL_WIDTH_ARGS,
    legendPosition: LEGEND_POSITION_ARGS,
    showLegend: SHOW_LEGEND_ARGS,
    showLegendValues: SHOW_LEGEND_VALUES_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    renderHiddenLegendLabel: RENDER_HIDDEN_LEGEND_LABEL_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

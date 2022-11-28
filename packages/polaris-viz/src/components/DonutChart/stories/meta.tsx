import React from 'react';
import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  LEGEND_POSITION_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {DonutChart, DonutChartProps} from '../DonutChart';

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
    legendPosition: LEGEND_POSITION_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
  decorators: [
    (Story) => <div style={{width: 550, height: 400}}>{Story()}</div>,
  ],
};

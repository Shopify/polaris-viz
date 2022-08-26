import React from 'react';
import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  LEGEND_POSITION_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {DonutChart, DonutChartProps} from '../DonutChart';

export const META: Meta<DonutChartProps> = {
  title: 'polaris-viz/Charts/DonutChart',
  component: DonutChart,
  parameters: {
    a11y: {disable: true},
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Circular statistical graphic, which is divided into slices to illustrate numerical proportion.',
      },
    },
  },
  argTypes: {
    data: {
      description:
        'A collection of named data sets to be rendered in the chart. An optional color can be provided for each series, to overwrite the theme `seriesColors` defined in `PolarisVizProvider`',
    },
    legendPosition: LEGEND_POSITION_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
  decorators: [
    (Story) => <div style={{width: 550, height: 400}}>{Story()}</div>,
  ],
};

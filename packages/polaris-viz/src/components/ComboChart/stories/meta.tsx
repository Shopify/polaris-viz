import type {Meta} from '@storybook/react';

import {
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  IS_ANIMATED_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {ComboChart} from '../ComboChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/ComboChart',
  component: ComboChart,
  parameters: {
    previewHeight: 'auto',
    docs: {
      description: {
        component: '',
      },
    },
    controls: CONTROLS_ARGS,
  },
  argTypes: {
    data: DATA_SERIES_ARGS,
    isAnimated: IS_ANIMATED_ARGS,
    renderLegendContent: RENDER_LEGEND_CONTENT_ARGS,
    type: TYPE_CONTROL_ARGS,
    theme: THEME_CONTROL_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
  },
};

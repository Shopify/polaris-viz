import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  THEME_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {FunnelChartNext} from '../FunnelChartNext';

export const META: Meta = {
  title: 'polaris-viz/Charts/FunnelChartNext',
  component: FunnelChartNext,
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show conversion data.',
      },
    },
  },
  argTypes: {
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
    showConnectionPercentage: {
      description:
        'Show the percentage change between each segment in the funnel.',
      control: {
        type: 'boolean',
      },
    },
  },
};

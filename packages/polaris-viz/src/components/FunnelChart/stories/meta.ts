import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  THEME_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo/PageWithSizingInfo';
import {FunnelChart} from '../FunnelChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/FunnelChart',
  component: FunnelChart,
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
  },
};

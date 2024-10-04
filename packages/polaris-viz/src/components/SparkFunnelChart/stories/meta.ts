import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {SparkFunnelChart} from '../SparkFunnelChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SparkFunnelChart',
  component: SparkFunnelChart,
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
    state: CHART_STATE_CONTROL_ARGS,
  },
};

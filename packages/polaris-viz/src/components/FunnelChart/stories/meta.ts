import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {FunnelChart} from '../FunnelChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show conversion data.',
      },
    },
  },
  argTypes: {
    xAxisOptions: {
      description: `Used to pass a labelFormatter function to format the values displayed on Y axis`,
    },
    yAxisOptions: {
      description:
        'Used to pass a labelFormatter function to format the values displayed on Y axis',
    },
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  LABEL_FORMATTER_ARGS,
  PERCENTAGE_FORMATTER_ARGS,
  SERIES_NAME_FORMATTER_ARGS,
  THEME_CONTROL_ARGS,
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
    seriesNameFormatter: SERIES_NAME_FORMATTER_ARGS,
    labelFormatter: LABEL_FORMATTER_ARGS,
    percentageFormatter: PERCENTAGE_FORMATTER_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

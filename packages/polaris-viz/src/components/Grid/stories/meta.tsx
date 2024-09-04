import type {Meta} from '@storybook/react';

import {Grid} from '../Grid';
import {
  CHART_STATE_CONTROL_ARGS,
  DATA_SERIES_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  IS_ANIMATED_ARGS,
  RENDER_BUCKET_LEGEND_LABEL_ARGS,
  RENDER_LEGEND_CONTENT_ARGS,
  THEME_CONTROL_ARGS,
  TYPE_CONTROL_ARGS,
  X_AXIS_OPTIONS_ARGS,
  Y_AXIS_OPTIONS_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';

export const META: Meta = {
  title: 'polaris-viz/Charts/Grid',
  component: Grid,
  parameters: {
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to show RFM analysis',
      },
    },
  },
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    data: DATA_SERIES_ARGS,
    emptyStateText: EMPTY_STATE_TEXT_ARGS,
    xAxisOptions: X_AXIS_OPTIONS_ARGS,
    yAxisOptions: Y_AXIS_OPTIONS_ARGS,
    theme: THEME_CONTROL_ARGS,
  },
};

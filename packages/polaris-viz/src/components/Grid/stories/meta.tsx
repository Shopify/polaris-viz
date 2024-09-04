import type {Meta} from '@storybook/react';

import {Grid} from '../Grid';
import {
  DATA_SERIES_ARGS,
  EMPTY_STATE_TEXT_ARGS,
  THEME_CONTROL_ARGS,
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
        component:
          'Used to quantitatively rank and group entities based on different metrics',
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

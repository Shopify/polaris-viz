import React from 'react';
import type {Meta} from '@storybook/react';

import {ComponentName} from '../../../components';
import {DATA_SERIES_ARGS, CONTROLS_ARGS} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';

export const META: Meta = {
  title: 'polaris-viz/Charts/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: '.',
      },
    },
    controls: CONTROLS_ARGS,
  },
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    data: DATA_SERIES_ARGS,
  },
};

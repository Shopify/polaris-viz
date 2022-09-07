import React from 'react';
import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  DATA_SERIES_ARGS,
  IS_ANIMATED_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {SparkBarChart} from '../SparkBarChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SparkBarChart',
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      page: PageWithSizingInfo,
      description: {
        component:
          'Used in small sizes to give an overview of how a metric has performed over time. ',
      },
    },
  },
  component: SparkBarChart,
  decorators: [
    (Story: any) => (
      <div style={{width: '200px', height: '100px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description: `${DATA_SERIES_ARGS.description}<br /><br /><strong>Note:</strong> We currently only support a single series. Any additional series passed to the data array will be ignored.`,
    },
    accessibilityLabel: {
      description: 'Visually hidden text for screen readers.',
    },
    targetLine: {
      description:
        'The prop to determine the value of the comparison line, as well as the number of pixels to add to the left and right margin to the bar data.',
    },
    isAnimated: IS_ANIMATED_ARGS,
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

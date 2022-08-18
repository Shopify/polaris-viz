import React from 'react';
import type {Meta} from '@storybook/react';

import {
  CHART_STATE_CONTROL_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories';
import {SparkBarChart} from '../SparkBarChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SparkBarChart',
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
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
      description:
        "The prop to determine the chart's bars. Null bars will not be plotted. Bars with the value of `0` will render a very small bar to indicate the presence of the value.<br /><br /><strong>Note:</strong> We currently only support a single series and a comparison series. Any additional series passed to the data array will be ignored.",
    },
    accessibilityLabel: {
      description: 'Visually hidden text for screen readers.',
    },
    targetLine: {
      description:
        'The prop to determine the value of the comparison line, as well as the number of pixels to add to the left and right margin to the bar data.',
    },
    isAnimated: {
      description: 'Determines whether to animate the chart on state changes.',
    },
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

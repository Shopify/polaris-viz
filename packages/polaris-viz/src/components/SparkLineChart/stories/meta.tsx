import type {Meta} from '@storybook/react';

import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo/PageWithSizingInfo';
import {
  CHART_STATE_CONTROL_ARGS,
  CONTROLS_ARGS,
  IS_ANIMATED_ARGS,
  THEME_CONTROL_ARGS,
} from '../../../storybook/constants';
import {SparkLineChart} from '../SparkLineChart';

export const META: Meta = {
  title: 'polaris-viz/Charts/SparkLineChart',
  component: SparkLineChart,
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
  decorators: [
    (Story: any) => (
      <div style={{height: '100px', width: '200px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    data: {
      description:
        'The SparkLineChart can show one data series or a set of comparison data series. Each series is configured by the series item in the array.',
    },
    accessibilityLabel: {
      description:
        'Visually hidden text for screen readers. Make sure to write [informative alt text.](https://medium.com/nightingale/writing-alt-text-for-data-visualization-2a218ef43f81)',
    },
    isAnimated: IS_ANIMATED_ARGS,
    offsetLeft: {
      description:
        'The amount of pixels to add as a left margin to the non-comparison line data.',
    },
    offsetRight: {
      description:
        'The amount of pixels to add as a right margin to the non-comparison line data.',
    },
    theme: THEME_CONTROL_ARGS,
    state: CHART_STATE_CONTROL_ARGS,
  },
};

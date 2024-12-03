import type {Meta} from '@storybook/react';

import type {TrendIndicatorProps} from '../TrendIndicator';
import {TrendIndicator} from '../TrendIndicator';
import {CONTROLS_ARGS, THEME_CONTROL_ARGS} from '../../../storybook/constants';
import {PageWithSizingInfo} from '../../Docs/stories/components/PageWithSizingInfo/PageWithSizingInfo';

export const META: Meta<TrendIndicatorProps> = {
  title: 'polaris-viz/Subcomponents/TrendIndicator',
  component: TrendIndicator,
  parameters: {
    docs: {
      page: PageWithSizingInfo,
      description: {
        component: 'Used to indicate a trend based on previous data.',
      },
    },
    controls: CONTROLS_ARGS,
  },
  decorators: [(Story) => <div style={{height: '500px'}}>{Story()}</div>],
  argTypes: {
    accessibilityLabel: {
      description: 'Visually hidden text for screen readers.',
    },
    direction: {
      description: 'Set the direction of the trend arrow.',
      options: ['upward', 'downward'],
    },
    theme: THEME_CONTROL_ARGS,
    trend: {
      description: 'Set the visual styling for the current trend.',
      options: ['positive', 'negative', 'neutral'],
    },
  },
};

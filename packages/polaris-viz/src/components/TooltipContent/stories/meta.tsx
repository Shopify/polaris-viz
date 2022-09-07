import type {Meta} from '@storybook/react';

import {CONTROLS_ARGS} from '../../../storybook/constants';
import {TooltipContent} from '../TooltipContent';

export const META: Meta = {
  title: 'polaris-viz/Subcomponents/TooltipContent',
  component: TooltipContent,
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      description: {
        component: '',
      },
    },
  },
};

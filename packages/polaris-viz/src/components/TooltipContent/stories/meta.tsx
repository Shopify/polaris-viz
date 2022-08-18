import type {Meta} from '@storybook/react';

import {TooltipContent} from '../TooltipContent';

export const META: Meta = {
  title: 'polaris-viz/Subcomponents/TooltipContent',
  component: TooltipContent,
  parameters: {
    controls: {sort: 'requiredFirst', expanded: true},
    docs: {
      description: {
        component: '',
      },
      yScale: {
        controls: null,
      },
      xScale: {
        controls: null,
      },
    },
  },
  argTypes: {},
};

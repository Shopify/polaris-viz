import type {Meta} from '@storybook/react';

import {CONTROLS_ARGS} from '../../../storybook/constants';
import {DefaultPreview} from '../DefaultPreview';

export const META: Meta = {
  title: 'Shared/Subcomponents/DefaultPreview',
  component: DefaultPreview,
  argTypes: {
    color: {
      description:
        'The CSS color or gradient array color to be displayed in the square.',
    },
  },
  parameters: {
    controls: CONTROLS_ARGS,
    docs: {
      description: {
        component:
          'Used to connect chart colors and gradients to information in tooltips and legends.',
      },
    },
  },
};

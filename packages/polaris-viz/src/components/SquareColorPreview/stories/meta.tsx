import type {Meta} from '@storybook/react';

import {CONTROLS_ARGS} from '../../../storybook/constants';
import {SquareColorPreview} from '../SquareColorPreview';

export const META: Meta = {
  title: 'Shared/Subcomponents/SquareColorPreview',
  component: SquareColorPreview,
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

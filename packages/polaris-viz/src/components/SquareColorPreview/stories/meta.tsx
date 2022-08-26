import type {Meta} from '@storybook/react';

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
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component:
          'Used to connect chart colors and gradients to information in tooltips and legends.',
      },
    },
  },
};

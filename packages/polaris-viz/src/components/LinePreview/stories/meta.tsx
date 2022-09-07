import type {Meta} from '@storybook/react';

import {CONTROLS_ARGS} from '../../../storybook/constants';
import {LinePreview} from '../LinePreview';

export const META: Meta = {
  title: 'Shared/Subcomponents/LinePreview',
  component: LinePreview,
  argTypes: {
    color: {
      description:
        'The CSS color or gradient array color to be displayed in the line.',
    },
    lineStyle: {
      options: ['solid', 'dashed', 'dotted'],
      description: 'Set the display style of the line.',
      table: {
        defaultValue: 'solid',
      },
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

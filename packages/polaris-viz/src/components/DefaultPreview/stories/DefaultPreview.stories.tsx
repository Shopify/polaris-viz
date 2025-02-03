import type {Story} from '@storybook/react';
import {COLOR_VARIABLES} from '@shopify/polaris-viz-core';

export {META as default} from './meta';

import type {DefaultPreviewProps} from '../..';

import {Template} from './data';

export const Solid: Story<DefaultPreviewProps> = Template.bind({});

Solid.args = {
  color: COLOR_VARIABLES.colorTeal80,
};

export const Gradient: Story<DefaultPreviewProps> = Template.bind({});

Gradient.args = {
  color: [
    {
      color: '#39337f',
      offset: 0,
    },
    {
      color: '#5052b3',
      offset: 50,
    },
    {
      color: '#1bbe9e',
      offset: 100,
    },
  ],
};

import React from 'react';
import {Story, Meta} from '@storybook/react';

import {SquareColorPreview, SquareColorPreviewProps} from '../../../components';
import {colorTeal} from '../../../constants';

export default {
  title: 'Subcomponents/SquareColorPreview',
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
} as Meta;

const Template: Story<SquareColorPreviewProps> = (
  args: SquareColorPreviewProps,
) => {
  return <SquareColorPreview {...args} />;
};

export const Solid: Story<SquareColorPreviewProps> = Template.bind({});

Solid.args = {
  color: colorTeal,
};

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

export const Gradient: Story<SquareColorPreviewProps> = Template.bind({});

Gradient.args = {
  color: [
    {
      color: negativePurple,
      offset: 0,
    },
    {
      color: purple,
      offset: 50,
    },
    {
      color: green,
      offset: 100,
    },
  ],
};

import React from 'react';
import type {Story, Meta} from '@storybook/react';

import {LinePreview, LinePreviewProps} from '../../../components';
import {colorTeal} from '../../../constants';

export default {
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
      defaultValue: 'solid',
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

const Template: Story<LinePreviewProps> = (args: LinePreviewProps) => {
  return <LinePreview {...args} />;
};

export const Solid: Story<LinePreviewProps> = Template.bind({});

Solid.args = {
  color: colorTeal,
};

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

export const Gradient: Story<LinePreviewProps> = Template.bind({});

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

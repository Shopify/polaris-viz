import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import {LinearGradient, LinearGradientProps} from '../LinearGradient';

export default {
  title: 'LinearGradient',
  component: LinearGradient,
  argTypes: {
    id: {
      control: false,
    },
  },
} as Meta;

const Template: Story<LinearGradientProps> = (args) => (
  <svg viewBox="0 0 500 500">
    <LinearGradient {...args} />
    <rect x="0" y="0" width="500" height="500" fill="url(#sampleGradient)" />
  </svg>
);

export const Default = Template.bind({});

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

Default.args = {
  id: 'sampleGradient',
  gradient: [
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

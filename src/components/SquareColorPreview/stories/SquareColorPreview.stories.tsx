import React from 'react';
import {Story, Meta} from '@storybook/react';

import {SquareColorPreview, SquareColorPreviewProps} from '../../../components';

export default {
  title: 'SquareColorPreview',
  component: SquareColorPreview,
  argTypes: {},
} as Meta;

const Template: Story<SquareColorPreviewProps> = (
  args: SquareColorPreviewProps,
) => {
  return <SquareColorPreview {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  color: 'primary',
};

const purple = '#5052b3';
const negativePurple = '#39337f';
const green = '#1bbe9e';

export const Gradient = Template.bind({});

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

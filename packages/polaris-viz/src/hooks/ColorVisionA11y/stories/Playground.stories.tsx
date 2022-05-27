import React from 'react';
import type {Story, Meta} from '@storybook/react';
import {Playground} from './Playground';

export default {
  title: 'playground/ColorVision',
  parameters: {
    horizontalMargin: 0,
  },
} as Meta;

const Template: Story = () => {
  return <Playground />;
};

export const Default = Template.bind({});

Default.args = {};

import React from 'react';
import {Story, Meta} from '@storybook/react';

import {ComponentName, ComponentNameProps} from '../../../components';

export default {
  title: 'ComponentName',
  component: ComponentName,
  argTypes: {},
} as Meta;

const Template: Story<ComponentNameProps> = (args: ComponentNameProps) => {
  return <ComponentName {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

import React from 'react';
import {Story, Meta} from '@storybook/react';

import {Widget} from '../Widget';

export default {
  title: 'Subcomponents/Widget',
  component: Widget,
} as Meta;

const Template: Story = (args: any) => {
  return <Widget {...args} />;
};
export const Default = Template.bind({});
// Default.args = defaultProps;

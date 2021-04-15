import React from 'react';
import {Story, Meta} from '@storybook/react';

import {ComponentName, ComponentNameProps} from '../../../components';

import styles from './ComponentName.stories.scss';

export default {
  title: 'ComponentName',
  component: ComponentName,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  argTypes: {},
} as Meta;

const Template: Story<ComponentNameProps> = (args: ComponentNameProps) => {
  return <ComponentName {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

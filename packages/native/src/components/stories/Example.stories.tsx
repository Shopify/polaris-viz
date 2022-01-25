import React from 'react';
import type {ComponentStory, ComponentMeta} from '@storybook/react';

import {Example} from '../Example';
import {Alert} from 'react-native';

export default {
  title: 'React Native/Example',
  component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => (
  <Example {...args} />
);

export const WithButton = Template.bind({});

WithButton.storyName = 'With button';
WithButton.args = {
  buttonText: 'Hello from React Native',
  onButtonPress: () => Alert.alert('Signed in'),
};

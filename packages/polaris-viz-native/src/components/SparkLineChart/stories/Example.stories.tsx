import React from 'react';
import type {ComponentStory, ComponentMeta} from '@storybook/react';

import {SparkLineChart} from '../SparkLineChart';
import {Alert} from 'react-native';

export default {
  title: 'React Native/SparkLineChart',
  component: SparkLineChart,
} as ComponentMeta<typeof SparkLineChart>;

const Template: ComponentStory<typeof SparkLineChart> = (args) => (
  <SparkLineChart {...args} />
);

export const WithButton = Template.bind({});

WithButton.storyName = 'With button';
WithButton.args = {
  buttonText: 'Hello from React Native',
  onButtonPress: () => Alert.alert('Signed in'),
};

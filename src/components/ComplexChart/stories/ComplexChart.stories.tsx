import React from 'react';
import {Story, Meta} from '@storybook/react';

import {ComplexChart} from '../ComplexChart';

export default {
  title: 'Charts/ComplexChart',
  component: ComplexChart,
  decorators: [(Story: any) => <div>{Story()}</div>],
} as Meta;

const Template: Story = (args) => {
  return <ComplexChart {...args} />;
};

export const InsightsStyle = Template.bind({});
InsightsStyle.parameters = {
  backgrounds: {
    // default: 'dark',
  },
};
InsightsStyle.args = {};

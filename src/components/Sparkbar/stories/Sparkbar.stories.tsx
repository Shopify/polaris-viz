import React from 'react';
import {Story, Meta} from '@storybook/react';

import {Sparkbar, SparkbarProps} from '../Sparkbar';
import {Color} from '../../../types';

import {colorOptions} from '../../../storybook';

const primaryColor = colorOptions[0] as Color;

export default {
  title: 'Sparkbar',
  component: Sparkbar,
  decorators: [
    (Story: any) => (
      <div style={{width: '200px', height: '200px'}}>{Story()}</div>
    ),
  ],
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorOptions,
        defaultValue: primaryColor,
      },
    },
  },
} as Meta;

const Template: Story<SparkbarProps> = (args: SparkbarProps) => {
  return <Sparkbar {...args} />;
};

export const Default = Template.bind({});
const comparisonValue = 500;
Default.args = {
  data: [100, 200, 300, 400, 400, 500, 600, 400, 700, 900, 800],
  comparison: [
    {x: 0, y: comparisonValue},
    {x: 1, y: comparisonValue},
    {x: 2, y: comparisonValue},
    {x: 3, y: comparisonValue},
    {x: 4, y: comparisonValue},
    {x: 5, y: comparisonValue},
    {x: 6, y: comparisonValue},
    {x: 7, y: comparisonValue},
    {x: 8, y: comparisonValue},
    {x: 9, y: comparisonValue},
    {x: 10, y: comparisonValue},
  ],
  color: primaryColor,
  barFillStyle: 'solid',
};

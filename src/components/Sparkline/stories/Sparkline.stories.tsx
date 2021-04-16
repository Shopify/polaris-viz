import React from 'react';
import {Story, Meta} from '@storybook/react';

import {Sparkline, SparklineProps} from '../..';
import {Color} from '../../../types';

import styles from './Sparkline.stories.scss';
import {colorOptions} from '../../../utilities';

const primaryColor = colorOptions[0] as Color;
const secondaryColor = colorOptions[1] as Color;

export default {
  title: 'Sparkline',
  component: Sparkline,
  decorators: [
    (Story: any) => <div className={styles.Container}>{Story()}</div>,
  ],
  argTypes: {},
} as Meta;

const Template: Story<SparklineProps> = (args: SparklineProps) => {
  return <Sparkline {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  series: [
    {
      color: primaryColor,
      areaStyle: 'gradient',
      hasPoint: true,
      data: [
        {x: 0, y: 100},
        {x: 1, y: 200},
        {x: 2, y: 300},
        {x: 3, y: 400},
        {x: 4, y: 400},
        {x: 5, y: 1000},
        {x: 6, y: 200},
        {x: 7, y: 800},
        {x: 8, y: 900},
        {x: 9, y: 200},
        {x: 10, y: 400},
      ],
    },
    {
      color: secondaryColor,
      areaStyle: 'none',
      lineStyle: 'dashed',
      data: [
        {x: 0, y: 10},
        {x: 1, y: 20},
        {x: 2, y: 30},
        {x: 3, y: 40},
        {x: 4, y: 40},
        {x: 5, y: 400},
        {x: 6, y: 20},
        {x: 7, y: 80},
        {x: 8, y: 90},
        {x: 9, y: 20},
        {x: 10, y: 40},
      ],
    },
  ],
  isAnimated: true,
};

import type {Story} from '@storybook/react';

import {DonutChart} from '../../DonutChart';
import type {DonutChartProps} from '../../DonutChart';

import {META} from '../meta';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

export const AnimationSpeed = Template.bind({});

AnimationSpeed.args = {
  data: [...Array(100).keys()].map((num) => {
    return {
      name: `${num}`,
      data: [{key: 'april - march', value: 10}],
    };
  }),
};

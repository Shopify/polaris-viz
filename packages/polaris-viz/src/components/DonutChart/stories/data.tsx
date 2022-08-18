import React from 'react';
import type {StoryFn} from '@storybook/react';

import {DonutChart, DonutChartProps} from '../DonutChart';

export const Template: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return <DonutChart {...args} />;
};

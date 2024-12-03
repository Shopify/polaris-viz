import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../StackedAreaChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const Annotations: Story<StackedAreaChartProps> = Template.bind({});

Annotations.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  annotations: [
    {
      startKey: 'February',
      label: 'Sales increase',
      axis: 'x',
    },
    {
      startKey: 'May',
      label: 'Super Big Sale',
      content: {
        content:
          'We ran a massive sale on our products. We made a lot of money!',
      },
      axis: 'x',
    },
    {
      startKey: '13000',
      label: 'Sales target',
      axis: 'y',
    },
    {
      startKey: '7500',
      label: 'Break-even',
      axis: 'y',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
};

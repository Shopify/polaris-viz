import type {Story} from '@storybook/react';

import type {LineChartProps} from '../../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/LineChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const Annotations: Story<LineChartProps> = Template.bind({});

Annotations.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  annotations: [
    {
      startKey: '2020-04-02T12:00:00',
      label: 'Sales increase',
      axis: 'x',
    },
    {
      startKey: '2020-04-06T12:00:00',
      label: 'Super Big Sale',
      content: {
        content:
          'We ran a massive sale on our products. We made a lot of money!',
      },
      axis: 'x',
    },
    {
      startKey: '540',
      label: 'Sales target',
      axis: 'y',
    },
    {
      startKey: '300',
      label: 'Break-even',
      axis: 'y',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
};

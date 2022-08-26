import type {Story} from '@storybook/react';

import type {BarChartProps} from '../../../../components';

import {DEFAULT_DATA, Template} from '../data';
import {META} from '../meta';

export default {
  ...META,
  title: 'polaris-viz/Charts/BarChart/Annotations',
};

export const VerticalBarChart: Story<BarChartProps> = Template.bind({});

VerticalBarChart.args = {
  data: DEFAULT_DATA,
  annotations: [
    {
      startKey: 'Friday',
      label: 'Big Sale',
      axis: 'x',
    },
    {
      startKey: 'Wednesday',
      label: 'GDPR rule change',
      content: {
        title: 'GDPR rule change',
        content:
          'New GDPR rules that prevent the unauthorized tracking of user sessions came into effect on Thursday, June 1.',
        linkUrl: 'https://shopify.com',
      },
      axis: 'x',
    },
    {
      startKey: '35',
      label: 'Sales target',
      axis: 'y',
    },
    {
      startKey: '10',
      label: 'Break-even',
      axis: 'y',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
};

import type {StoryFn} from '@storybook/react';
import type {BarChartProps} from '../../../../components';
import {DEFAULT_DATA, Template} from '../data';
import {META} from '../meta';
export const Default: StoryFn<BarChartProps> = Template.bind({});
Default.args = {
  data: DEFAULT_DATA,
  annotations: [
    {
      startKey: 'Friday',
      label: 'Big Sale',
      axis: 'y',
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
      axis: 'y',
    },
    {
      startKey: '33',
      label: 'Sales target',
      axis: 'x',
    },
    {
      startKey: '10',
      label: 'Break-even',
      axis: 'x',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
  direction: 'horizontal',
};

export default {...META, title: 'polaris-viz/Charts/BarChart/Annotations'} as any;

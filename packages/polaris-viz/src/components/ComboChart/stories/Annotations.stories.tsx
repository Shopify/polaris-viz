import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {ComboChartProps} from '../ComboChart';

import {DEFAULT_DATA, Template} from './data';

export const Annotations: Story<ComboChartProps> = Template.bind({});

Annotations.args = {
  data: DEFAULT_DATA,
  annotations: [
    {
      startKey: '2020-07-08T12:00:00',
      label: 'Big Sale',
      axis: 'x',
    },
    {
      startKey: '2020-07-11T12:00:00',
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
      startKey: '15',
      label: 'Sales target',
      axis: 'y1',
    },
    {
      startKey: '399',
      label: 'Break-even',
      axis: 'y2',
      content: {
        content: 'This is our break-even point. We can sell for $10 per unit.',
      },
    },
  ],
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const SingleDataPoint: Story<DonutChartProps> = Template.bind({});

SingleDataPoint.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Engagement',
      data: [{key: 'april - march', value: 25000}],
    },
  ],
};

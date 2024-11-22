import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const SingleDataPoint: StoryFn<DonutChartProps> = Template.bind({});

SingleDataPoint.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Engagement',
      data: [{key: 'april - march', value: 25000}],
    },
  ],
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/SingleDataPoint'} as any;
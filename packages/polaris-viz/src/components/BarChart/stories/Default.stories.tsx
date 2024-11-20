import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';



export const Default: StoryFn<BarChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  onError: (a, b) => {
    console.log({a, b});
  },
};

export default {...META, title: 'polaris-viz/Charts/BarChart/Default'} as any;
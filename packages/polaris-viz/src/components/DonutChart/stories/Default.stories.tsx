import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const Default: StoryFn<DonutChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/Default'} as any;
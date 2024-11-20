import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const HideXAxis: StoryFn<BarChartProps> = Template.bind({});

HideXAxis.args = {
  data: DEFAULT_DATA,
  xAxisOptions: {hide: true},
};

export default {...META, title: 'polaris-viz/Charts/BarChart/HideXAxis'} as any;
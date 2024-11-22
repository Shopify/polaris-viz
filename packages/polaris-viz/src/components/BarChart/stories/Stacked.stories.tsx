import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Stacked: StoryFn<BarChartProps> = Template.bind({});

Stacked.args = {
  data: DEFAULT_DATA,
  type: 'stacked',
};

export default {...META, title: 'polaris-viz/Charts/BarChart/Stacked'} as any;
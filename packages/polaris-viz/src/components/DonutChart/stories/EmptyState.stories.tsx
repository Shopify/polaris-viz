import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const EmptyState: StoryFn<DonutChartProps> = Template.bind({});

EmptyState.args = {
  ...DEFAULT_PROPS,
  comparisonMetric: undefined,
  data: DEFAULT_DATA.map(({name, data}) => ({
    name,
    data: data.map(({key}) => ({key, value: 0})),
  })),
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/EmptyState'} as any;
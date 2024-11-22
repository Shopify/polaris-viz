import {ChartState} from '@shopify/polaris-viz-core';
import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const LoadingState: StoryFn<DonutChartProps> = Template.bind({});

LoadingState.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA.map(({name}) => ({
    name,
    data: [],
  })),
  state: ChartState.Loading,
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/LoadingState'} as any;
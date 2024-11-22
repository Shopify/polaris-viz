import {ChartState} from '@shopify/polaris-viz-core';
import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const ErrorState: StoryFn<DonutChartProps> = Template.bind({});

ErrorState.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA.map(({name}) => ({
    name,
    data: [],
  })),
  state: ChartState.Error,
};

export default {...META, title: 'polaris-viz/Charts/DonutChart/ErrorState'} as any;
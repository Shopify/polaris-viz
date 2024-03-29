import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const LoadingState: Story<DonutChartProps> = Template.bind({});

LoadingState.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA.map(({name}) => ({
    name,
    data: [],
  })),
  state: ChartState.Loading,
};

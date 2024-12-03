import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const LoadingStateWithoutLegend: Story<SimpleNormalizedChartProps> = Template.bind({});

LoadingStateWithoutLegend.args = {
  ...DEFAULT_PROPS,
  showLegend: false,
  data: DEFAULT_DATA.map(({name}) => ({
    name,
    data: [],
  })),
  state: ChartState.Loading,
};

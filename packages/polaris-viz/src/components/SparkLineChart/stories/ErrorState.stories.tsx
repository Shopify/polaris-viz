import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../SparkLineChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const ErrorState: Story<SparkLineChartProps> = Template.bind({});

ErrorState.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  state: ChartState.Error,
};

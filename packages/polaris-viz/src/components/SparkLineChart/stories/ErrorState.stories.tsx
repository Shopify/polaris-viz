import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const ErrorState: Story<SparkLineChartProps> = Template.bind({});

ErrorState.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  state: ChartState.Error,
};

export const InfinityData: Story<SparkLineChartProps> = Template.bind({});

InfinityData.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      data: [
        {key: 0, value: 100},
        {key: 1, value: Infinity},
      ],
    },
  ],
};

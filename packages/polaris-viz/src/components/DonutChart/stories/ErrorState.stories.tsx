import {ChartState} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, Template} from './data';

export const ErrorState: Story<DonutChartProps> = Template.bind({});

ErrorState.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Engagement',
      data: [{key: 'april - march', value: 25000}],
    },
  ],
  state: ChartState.Error,
};

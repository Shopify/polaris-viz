import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const EmptyState: Story<DonutChartProps> = Template.bind({});

EmptyState.args = {
  ...DEFAULT_PROPS,
  comparisonMetric: undefined,
  data: DEFAULT_DATA.map(({name, data}) => ({
    name,
    data: data.map(({key}) => ({key, value: 0})),
  })),
};

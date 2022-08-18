import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../../../components';

import {DEFAULT_PROPS, Template} from './data';

export const OverwrittenSeriesColors: Story<StackedAreaChartProps> =
  Template.bind({});

OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'One',
      data: Array(5)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
      color: 'lime',
    },
    {
      name: 'Two',
      data: Array(5)
        .fill(null)
        .map(() => {
          return {
            value: Math.random() * Math.random() * 100,
            key: Math.random().toString(),
          };
        }),
    },
  ],
};

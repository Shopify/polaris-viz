import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../../../components';

import {DEFAULT_PROPS, Template} from './data';

export const OverwrittenSeriesColors: Story<StackedAreaChartProps> =
  Template.bind({});

const ITEMS = Array(5).fill(null);

OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'One',
      data: ITEMS.map((_, index) => {
        return {
          value: Math.random() * Math.random() * 100,
          key: `${index}`,
        };
      }),
      color: 'lime',
    },
    {
      name: 'Two',
      data: ITEMS.map((_, index) => {
        return {
          value: Math.random() * Math.random() * 100,
          key: `${index}`,
        };
      }),
    },
  ],
};

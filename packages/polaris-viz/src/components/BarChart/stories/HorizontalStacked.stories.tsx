import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../BarChart';

import {Template} from './data';
import {PolarisVizProvider} from '../../PolarisVizProvider/PolarisVizProvider';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

export const HorizontalStacked: Story<BarChartProps> = (
  args: BarChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        [DEFAULT_THEME_NAME]: {
          groupLabel: {
            hide: true,
          },
        },
      }}
    >
      <Template {...args} />
    </PolarisVizProvider>
  );
};

HorizontalStacked.args = {
  data: [
    {
      name: 'Breakfast',
      data: [
        {key: 'Monday', value: -2},
        {key: 'Tuesday', value: -10},
        {key: 'Wednesday', value: -7},
        {key: 'Thursday', value: -0.12},
        {key: 'Friday', value: 0},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0},
      ],
    },
    {
      name: 'Lunch',
      data: [
        {key: 'Monday', value: -10},
        {key: 'Tuesday', value: -7},
        {key: 'Wednesday', value: -12},
        {key: 'Thursday', value: -4},
        {key: 'Friday', value: 0},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0},
      ],
    },
    {
      name: 'Dinner',
      data: [
        {key: 'Monday', value: -1},
        {key: 'Tuesday', value: -4},
        {key: 'Wednesday', value: -2},
        {key: 'Thursday', value: -2},
        {key: 'Friday', value: 0},
        {key: 'Saturday', value: 0},
        {key: 'Sunday', value: 0},
      ],
    },
  ],
  type: 'stacked',
  direction: 'horizontal',
};

import type {Story} from '@storybook/react';

import {META} from '../meta';

import type {BarChartProps} from '../../../../components';

import {Template} from '../data';
import {PolarisVizProvider} from '../../../PolarisVizProvider';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

export const StackedHorizontalLotsOfLegends: Story<BarChartProps> = (
  args: BarChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        Default: {
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

StackedHorizontalLotsOfLegends.args = {
  data: [...Array(20).keys()].map((index) => {
    return {
      name: `Legend ${index}`,
      data: [
        {key: 'Monday', value: -2},
        {key: 'Tuesday', value: -10},
      ],
    };
  }),
  type: 'stacked',
  direction: 'horizontal',
};

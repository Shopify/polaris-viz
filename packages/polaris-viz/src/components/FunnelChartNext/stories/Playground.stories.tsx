import type {Story} from '@storybook/react';

import type {FunnelChartNextProps} from '../../FunnelChartNext';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

import {Template} from './data';
import {META} from './meta';

export const ZeroValues: Story<FunnelChartNextProps> = Template.bind({});

const labelFormatter = (value) => {
  return new Intl.NumberFormat('en', {
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(Number(value));
};

ZeroValues.args = {
  data: [
    {
      data: [
        {
          value: 0,
          key: 'Sessions',
        },
        {
          value: 0,
          key: 'Sessions with cart addition',
        },
        {
          value: 0,
          key: 'Sessions that reached checkout',
        },
        {
          value: 0,
          key: 'Sessions that completed checkout',
        },
      ],
      name: 'Conversion rates',
    },
  ],
  labelFormatter,
  tooltipLabels: {
    reached: 'Reached this step',
    dropped: 'Dropped off',
  },
};

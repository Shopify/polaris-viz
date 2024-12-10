import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';

import type {FunnelChartNextProps} from '../FunnelChartNext';
import {FunnelChartNext} from '../FunnelChartNext';

export const DEFAULT_DATA: DataSeries[] = [
  {
    data: [
      {
        value: 454662,
        key: 'Sessions',
      },
      {
        value: 54654,
        key: 'Sessions with cart addition',
      },
      {
        value: 47887,
        key: 'Sessions that reached checkout',
      },
      {
        value: 22543,
        key: 'Sessions that completed checkout',
      },
    ],
    name: 'Conversion rates',
  },
];

export const Template: Story<FunnelChartNextProps> = (
  args: FunnelChartNextProps,
) => {
  return (
    <div style={{height: 400}}>
      <FunnelChartNext {...args} />
    </div>
  );
};

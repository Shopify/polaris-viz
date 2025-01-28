import type {DataSeries} from '@shopify/polaris-viz-core';
import type {Story} from '@storybook/react';
import {Fragment} from 'react';

import type {FunnelChartNextProps} from '../FunnelChartNext';
import {FunnelChartNext} from '../FunnelChartNext';

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Conversion rates',
    data: [
      {
        value: 454662,
        key: 'Sessions',
      },
      {
        value: 68654,
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
  },
];

const defaultLabelFormatter = (value) => {
  return new Intl.NumberFormat('en', {
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(Number(value));
};

const defaultPercentageFormatter = (value) =>
  `${defaultLabelFormatter(value)}%`;

const defaultTooltipLabels = {
  reached: 'Reached this step',
  dropped: 'Dropped off',
};

const defaultRenderScaleIconTooltipContent = () => (
  <Fragment>
    <div>Truncated Sessions</div>{' '}
    <p style={{color: 'black', fontSize: '12px', lineHeight: '12px'}}>
      Sessions were drawn to scale to better represent the funnel
    </p>
  </Fragment>
);

export const DEFAULT_PROPS: Partial<FunnelChartNextProps> = {
  tooltipLabels: defaultTooltipLabels,
  labelFormatter: defaultLabelFormatter,
  percentageFormatter: defaultPercentageFormatter,
  renderScaleIconTooltipContent: defaultRenderScaleIconTooltipContent,
};

export const Template: Story<FunnelChartNextProps> = (
  args: FunnelChartNextProps,
) => {
  return (
    <div style={{height: 400, marginTop: 20}}>
      <FunnelChartNext {...args} />
    </div>
  );
};

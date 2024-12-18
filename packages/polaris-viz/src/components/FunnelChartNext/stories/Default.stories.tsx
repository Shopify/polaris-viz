import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {FunnelChartNextProps} from '../FunnelChartNext';

import {DEFAULT_DATA, Template} from './data';
import {Fragment} from 'react';

export const Default: Story<FunnelChartNextProps> = Template.bind({});

const labelFormatter = (value) => {
  return new Intl.NumberFormat('en', {
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(Number(value));
};

const percentageFormatter = (value) => `${labelFormatter(value)}%`;

Default.args = {
  data: DEFAULT_DATA,
  labelFormatter,
  percentageFormatter,
  renderScaleIconTooltipContent: () => (
    <Fragment>
      <div>Truncated Sessions</div>{' '}
      <p style={{color: 'black', fontSize: '12px', lineHeight: '12px'}}>
        Sessions were drawn to scale to better represent the funnel
      </p>
    </Fragment>
  ),
};

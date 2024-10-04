import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {FunnelChartNextProps} from '../FunnelChartNext';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<FunnelChartNextProps> = Template.bind({});

const yAxisOptions = {
  labelFormatter: (value) => {
    return new Intl.NumberFormat('en', {
      style: 'decimal',
      maximumFractionDigits: 2,
    }).format(Number(value));
  },
};

Default.args = {
  data: DEFAULT_DATA,
  yAxisOptions: yAxisOptions,
  tooltipLabels: {
    reached: 'Reached this step',
    dropped: 'Dropped off',
  },
};

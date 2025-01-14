import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/FunnelChartNext',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {DEFAULT_DATA, Template} from './data';
import {META} from './meta';
import type {FunnelChartNextProps} from '../FunnelChartNext';

export const Default: Story<FunnelChartNextProps> = Template.bind({});

const labelFormatter = (value) => {
  return new Intl.NumberFormat('en', {
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(Number(value));
};

Default.args = {
  data: DEFAULT_DATA,
  labelFormatter,
  tooltipLabels: {
    reached: 'Reached this step',
    dropped: 'Dropped off',
  },
};

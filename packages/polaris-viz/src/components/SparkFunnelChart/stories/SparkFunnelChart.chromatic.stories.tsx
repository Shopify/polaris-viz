import type {Story} from '@storybook/react';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/SparkFunnelChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

import {DEFAULT_DATA, Template} from './data';
import {META} from './meta';
import type {SparkFunnelChartProps} from '../SparkFunnelChart';

export const Default: Story<SparkFunnelChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
};

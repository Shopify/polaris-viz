import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkFunnelChartProps} from '../SparkFunnelChart';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<SparkFunnelChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
};

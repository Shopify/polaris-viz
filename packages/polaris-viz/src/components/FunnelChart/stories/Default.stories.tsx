import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {FunnelChartProps} from '../FunnelChart';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<FunnelChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
};

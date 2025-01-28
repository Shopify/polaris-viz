import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {FunnelChartNextProps} from '../FunnelChartNext';

import {DEFAULT_DATA, Template, DEFAULT_PROPS} from './data';

export const Default: Story<FunnelChartNextProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  ...DEFAULT_PROPS,
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../LineChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const Default: Story<LineChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

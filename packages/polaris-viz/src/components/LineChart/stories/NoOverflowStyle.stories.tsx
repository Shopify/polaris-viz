import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../LineChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const NoOverflowStyle: Story<LineChartProps> = Template.bind({});

NoOverflowStyle.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  theme: 'NoOverflow',
};

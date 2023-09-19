import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const Tooltip: Story<DonutChartProps> = Template.bind({});

Tooltip.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleNormalizedChartProps} from '../SimpleNormalizedChart';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const HiddenLegend: Story<SimpleNormalizedChartProps> = Template.bind({});

HiddenLegend.args = {
  ...DEFAULT_PROPS,
  showLegend: false,
  data: DEFAULT_DATA,
};

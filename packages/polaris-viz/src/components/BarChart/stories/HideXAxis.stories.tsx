import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const HideXAxis: Story<BarChartProps> = Template.bind({});

HideXAxis.args = {
  data: DEFAULT_DATA,
  xAxisOptions: {hide: true},
};

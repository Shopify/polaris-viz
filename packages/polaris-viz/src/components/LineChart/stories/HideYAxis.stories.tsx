import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../..';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const HideYAxis: Story<LineChartProps> = Template.bind({});

HideYAxis.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  yAxisOptions: {
    hide: true,
  },
};

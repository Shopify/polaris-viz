import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';
import type {LineChartProps} from 'components/LineChart/LineChart';

export const Default: Story<LineChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  isAnimated: false,
  showLegend: true,
  theme: 'Uplift',
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';
import type {LineChartRelationalProps} from '../LineChartRelational';

export const Default: Story<LineChartRelationalProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  isAnimated: false,
  showLegend: true,
};

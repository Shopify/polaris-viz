import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../LineChart';
import {formatLinearXAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const HideXAxis: Story<LineChartProps> = Template.bind({});

HideXAxis.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
    hide: true,
  },
};

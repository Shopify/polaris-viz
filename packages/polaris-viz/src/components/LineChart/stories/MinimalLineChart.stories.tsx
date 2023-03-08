import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../..';
import {formatLinearXAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const MinimalLineChart: Story<LineChartProps> = Template.bind({});

MinimalLineChart.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
    hide: true,
  },
};

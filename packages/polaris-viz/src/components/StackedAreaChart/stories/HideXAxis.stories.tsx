import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {StackedAreaChartProps} from '../StackedAreaChart';
import {formatLinearXAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const HideXAxisLabels: Story<StackedAreaChartProps> = Template.bind({});

HideXAxisLabels.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
    hide: true,
  },
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkBarChartProps} from '../SparkBarChart';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const NoTargetLine: Story<SparkBarChartProps> = Template.bind({});

NoTargetLine.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

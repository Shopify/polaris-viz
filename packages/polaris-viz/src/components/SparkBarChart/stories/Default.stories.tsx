import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkBarChartProps} from '../../../components';

import {
  DEFAULT_DATA,
  DEFAULT_PROPS,
  DEFAULT_COMPARISON_VALUE,
  Template,
} from './data';

export const Default: Story<SparkBarChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  targetLine: {
    value: DEFAULT_COMPARISON_VALUE,
  },
};

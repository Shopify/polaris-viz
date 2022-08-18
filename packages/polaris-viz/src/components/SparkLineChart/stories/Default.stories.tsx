import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SparkLineChartProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const Default: Story<SparkLineChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

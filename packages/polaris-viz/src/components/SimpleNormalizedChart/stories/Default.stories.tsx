import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleNormalizedChartProps} from '../../../components';

import {DEFAULT_PROPS, DEFAULT_DATA, Template} from './data';

export const Default: Story<SimpleNormalizedChartProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

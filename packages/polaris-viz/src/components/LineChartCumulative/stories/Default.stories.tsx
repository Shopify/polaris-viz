import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartCumulativeProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const Default: Story<LineChartCumulativeProps> = Template.bind({});

Default.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

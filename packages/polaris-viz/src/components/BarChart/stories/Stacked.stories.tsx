import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Stacked: Story<BarChartProps> = Template.bind({});

Stacked.args = {
  data: DEFAULT_DATA,
  type: 'stacked',
};

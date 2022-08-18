import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {SERIES, Template} from './data';

export const SimpleStacked: Story<SimpleBarChartProps> = Template.bind({});

SimpleStacked.args = {
  data: SERIES,
  type: 'stacked',
};

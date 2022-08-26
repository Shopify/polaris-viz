import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {SINGLE_SERIES, Template} from './data';

export const Default: Story<SimpleBarChartProps> = Template.bind({});

Default.args = {
  data: SINGLE_SERIES,
};

import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {SimpleBarChartProps} from '../SimpleBarChart';

import {SERIES, Template} from './data';

export const MultipleSeries: Story<SimpleBarChartProps> = Template.bind({});

MultipleSeries.args = {
  data: SERIES,
};

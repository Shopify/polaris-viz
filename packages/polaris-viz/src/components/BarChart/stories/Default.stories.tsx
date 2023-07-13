import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<BarChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  onError: (a, b) => {
    console.log({a, b});
  },
};

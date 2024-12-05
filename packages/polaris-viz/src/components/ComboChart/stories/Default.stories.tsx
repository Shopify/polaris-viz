import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {ComboChartProps} from '../ComboChart';

import {DEFAULT_DATA, Template} from './data';

export const Default: Story<ComboChartProps> = Template.bind({});

Default.args = {
  data: DEFAULT_DATA,
  xAxisOptions: {
    labelFormatter: (value: string) => {
      return new Date(value).toLocaleDateString('en-CA', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    },
  },
};

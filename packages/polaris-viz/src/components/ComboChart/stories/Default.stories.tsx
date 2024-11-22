import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import type {ComboChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export const Default: StoryFn<ComboChartProps> = Template.bind({});

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

export default {...META, title: 'Polaris Viz/Charts/ComboChart/Default'} as any;
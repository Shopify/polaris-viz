import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../LineChart';
import {formatLinearYAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const IntegersOnly: Story<LineChartProps> = Template.bind({});

IntegersOnly.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Integers Only',
      data: [
        {value: 0.1, key: '2020-04-01T12:00:00'},
        {value: 0.4, key: '2020-04-02T12:00:00'},
        {value: 0.6, key: '2020-04-03T12:00:00'},
        {value: 0.2, key: '2020-04-04T12:00:00'},
        {value: 0.5, key: '2020-04-05T12:00:00'},
        {value: 0.9, key: '2020-04-06T12:00:00'},
        {value: 0.5, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
  yAxisOptions: {integersOnly: true, labelFormatter: formatLinearYAxisLabel},
};

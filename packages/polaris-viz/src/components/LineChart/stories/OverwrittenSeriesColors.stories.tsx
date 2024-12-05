import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../LineChart';
import {formatLinearXAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const OverwrittenSeriesColors: Story<LineChartProps> = Template.bind({});

OverwrittenSeriesColors.args = {
  ...DEFAULT_PROPS,
  data: [
    {
      name: 'Sales',
      data: [
        {value: 100, key: '2020-04-01T12:00:00'},
        {value: 99, key: '2020-04-02T12:00:00'},
        {value: 1000, key: '2020-04-03T12:00:00'},
        {value: 2, key: '2020-04-04T12:00:00'},
        {value: 22, key: '2020-04-05T12:00:00'},
        {value: 6, key: '2020-04-06T12:00:00'},
        {value: 5, key: '2020-04-07T12:00:00'},
      ],
      color: 'lime',
    },
  ],
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
};

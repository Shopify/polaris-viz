import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {BarChartProps} from '../BarChart';
import {formatPercentageYAxisLabel} from '../../../storybook/utilities';

import {Template} from './data';

export const YAxisPercentages: Story<BarChartProps> = Template.bind({});

YAxisPercentages.args = {
  data: [
    {
      name: 'Apr 1 – Apr 14, 2020',
      data: [
        {value: 0, key: '2020-04-01T12:00:00'},
        {value: 0, key: '2020-04-02T12:00:00'},
        {value: 0, key: '2020-04-03T12:00:00'},
        {value: 0, key: '2020-04-04T12:00:00'},
        {value: 0, key: '2020-04-05T12:00:00'},
        {value: 0, key: '2020-04-06T12:00:00'},
        {value: 0, key: '2020-04-07T12:00:00'},
      ],
    },
  ],
  yAxisOptions: {labelFormatter: formatPercentageYAxisLabel, maxYOverride: 1},
};

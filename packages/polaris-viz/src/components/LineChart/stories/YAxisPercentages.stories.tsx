import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../..';
import {formatPercentageYAxisLabel} from '../../../storybook/utilities';

import {DEFAULT_PROPS, Template} from './data';

export const YAxisPercentages: Story<LineChartProps> = Template.bind({});

YAxisPercentages.args = {
  ...DEFAULT_PROPS,
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
        {value: 0, key: '2020-04-08T12:00:00'},
      ],
    },
  ],
  yAxisOptions: {labelFormatter: formatPercentageYAxisLabel, maxYOverride: 1},
};

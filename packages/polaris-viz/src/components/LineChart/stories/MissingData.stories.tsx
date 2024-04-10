import type {Story} from '@storybook/react';

export {META as default} from './meta';

import type {LineChartProps} from '../../../components';

import {DEFAULT_DATA, DEFAULT_PROPS, Template} from './data';

export const MissingData: Story<LineChartProps> = Template.bind({});

MissingData.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
  missingData: {
    from: '2020-04-03T12:00:00',
    to: '2020-04-05T12:00:00',
    label: 'Latency',
    description: 'Benchmarks data available through Oct 15, 2022 Not available',
  },
};

import type {Story} from '@storybook/react';

import {META} from './meta';

import type {SimpleBarChartProps} from '../../../components';

import {SINGLE_SERIES, Template} from './data';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/SimpleBarChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const FormattedValues: Story<SimpleBarChartProps> = Template.bind({});

FormattedValues.args = {
  data: SINGLE_SERIES,
  seriesNameFormatter: (value) => `Name: ${value}`,
  xAxisOptions: {
    labelFormatter: (value) => `xAxis: ${value}`,
  },
  yAxisOptions: {
    labelFormatter: (value) => `yAxis: ${value}`,
  },
  onError: (a, b) => {
    console.log({a, b});
  },
};

import type {Story} from '@storybook/react';

import {META} from './meta';

import type {StackedAreaChartProps} from '../StackedAreaChart';

import {DEFAULT_DATA, Template} from './data';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/StackedAreaChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const FormattedValues: Story<StackedAreaChartProps> = Template.bind({});

FormattedValues.args = {
  data: DEFAULT_DATA,
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

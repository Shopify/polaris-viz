import type {Story} from '@storybook/react';

import {META} from './meta';

import type {BarChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/BarChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const FormattedValues: Story<BarChartProps> = Template.bind({});

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

export const FormattedValuesHorizontal: Story<BarChartProps> = Template.bind(
  {},
);

FormattedValuesHorizontal.args = {
  data: DEFAULT_DATA,
  direction: 'horizontal',
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

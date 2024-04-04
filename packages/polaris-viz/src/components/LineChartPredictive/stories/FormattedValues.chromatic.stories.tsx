import type {Story} from '@storybook/react';

import {META} from './meta';

import {DEFAULT_DATA, Template} from './data';
import type {LineChartPredictiveProps} from '../types';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/LineChartPredictive',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const FormattedValues: Story<LineChartPredictiveProps> = Template.bind(
  {},
);

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

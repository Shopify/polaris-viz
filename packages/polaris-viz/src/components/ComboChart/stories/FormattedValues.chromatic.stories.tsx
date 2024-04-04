import type {Story} from '@storybook/react';

import {META} from './meta';

import type {ComboChartProps} from '../../../components';

import {DEFAULT_DATA, Template} from './data';

export default {
  ...META,
  title: 'polaris-viz/Chromatic/Charts/ComboChart',
  parameters: {
    ...META.parameters,
    chromatic: {disableSnapshot: false},
  },
};

export const FormattedValues: Story<ComboChartProps> = Template.bind({});

FormattedValues.args = {
  data: DEFAULT_DATA,
  seriesNameFormatter: (value) => `Name: ${value}`,
  xAxisOptions: {
    labelFormatter: (value) => `xAxis: ${value}`,
  },
  onError: (a, b) => {
    console.log({a, b});
  },
};
